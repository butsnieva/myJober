const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Job } = require('../models');

const resolvers = {
  Query: {
    // categories: async () => {
    //   return await Category.find();
    // },
    //     jobs: async () => {
    //     return await Job.find();
    // },

    jobs: async () => {
      return await Job.find()
      // if (category) {
      //   params.category = category;
      // }
    },
    job: async (parent, { _id }) => {
      return Job.findOne({ _id })
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
          .select('-__v')
          .populate('jobs')
        return user
      }
      throw new AuthenticationError('Not logged in')
    },

    // user: async (parent, args, context) => {
    //   if (context.user) {
    //     const user = await User.findById(context.user._id).populate({
    //       // path: 'jobs.responses',
    //       populate: 'jobs',
    //     });

    //     // do we want to sort by created date of the job posting?
    //     user.job.sort((a, b) => b.createdDate - a.createdDate);

    //     return user;
    //  }
    // },
    users: async () => {
      return User.find().select('-__v -password').populate('jobs')
    },

    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('jobs')
        return userData
      }

      throw new AuthenticationError('Not logged in')
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      console.log(args, 'testbackend')
      const user = await User.create(args)
      const token = signToken(user)

      return { token, user }
    },

    addJob: async (parent, args, context) => {
      if (context.user) {
        const job = await Job.create({
          ...args,
          firstName: context.user.firstName,
          lastName: context.user.lastName,
        })

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { jobs: job._id } },
          { new: true }
        )
        await Job.findByIdAndUpdate(
          { _id: job._id },
          { userId: context.user._id },
          { new: true }
        )

        return job
      }

      throw new AuthenticationError('You need to be logged in!')
    },
    // updateUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return await user.findByIdAndUpdate(context.user._id, args, { new: true });
    //   }
    //   throw new AuthenticationError('You are not logged in!');
    // },
    // updatedJob: async (parent, args, context) => {
    //   if (context.job) {
    //     return await job.findByIdAndUpdate(context.job._id, args, { new: true });
    //   }
    //   throw new AuthenticationError('You must be logged in!');
    // },
    // removeJob: async (parent, args, context) => {
    //   if (context.user) {
    //     const job = await Job.remove({ ...args, username: context.user.username });

    //     await User.findByIdAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { jobs: job._id } },
    //       { new: true }
    //     );
    //   }
    // },

    removeJob: async (parent, { jobId }, context) => {
      if (context.user) {
        Job.findOneAndDelete({ _id: jobId }, function (err, docs) {
          if (err) {
            console.log('delete error', err)
          } else {
            console.log('delete job, ID:', jobId)
          }
        })

        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { jobs: jobId } },
          { new: true }
        ).populate('jobs')

        return updatedUser
      }
      throw new AuthenticationError('You must be logged in!')
    },


    updateJob: async (
      parent,
      { jobId, title, description, price, location },
      context
    ) => {
      if (context.user) {
        const updatedJob = await Job.findByIdAndUpdate(
          { _id: jobId },
          {
            title: title,
            description: description,
            price: price,
            location: location,
          },
          { new: true }
        )
        return updatedJob
      }
      throw new AuthenticationError('You need to be logged in!')
    },


    login: async (parent, { email, password }) => {
      console.log('this is a test')
      const user = await User.findOne({ email })
      if (!user) {
        throw new AuthenticationError('Incorrect login credentials!')
      }
      const correctPw = await user.isCorrectPassword(password)
      if (!correctPw) {
        throw new AuthenticationError('Incorrect login credentials!')
      }
      const token = signToken(user)
      return { token, user }
    },
    // addResponse: async (parent, { jobId, responseBody }, context) => {
    //   if (context.user) {
    //     const updatedJob = await Job.findOneAndUpdate(
    //       { _id: jobId },
    //       { $push: { responses: { responseBody, username: context.user.username } } },
    //       { new: true, runValidators: true }
    //     );

    //     return updatedJob;
    //   }

    //   throw new AuthenticationError('You must be logged in!');
  },
}
module.exports = resolvers;
