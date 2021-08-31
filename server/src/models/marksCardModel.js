// const mongoose = require("mongoose");

// const marksCardSchema = mongoose.Schema(
//   {
//     student_id: {
//       // type: mongoose.Schema.Types.ObjectId,
//       // ref: 'Student',
//       // required: true
//       type: String,
//     },
//     stud_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Student",
//       required: true,
//     },
//     updated_by: {
//       // type: mongoose.Schema.Types.ObjectId,
//       // ref: 'Faculty',
//       // required: true
//       type: String,
//     },
//     marksCard_list: [
//       {
//         semister: {
//           type: String,
//           enum: [
//             "sem-1",
//             "sem-2",
//             "sem-3",
//             "sem-4",
//             "sem-5",
//             "sem-6",
//             "sem-7",
//             "sem-8",
//           ],
//         },
//         IA: [
//           {
//             IA_type: {
//               type: String,
//               enum: ["IA-1", "IA-2"],
//             },
//             marks: [
//               {
//                 subject: {
//                   type: String,
//                 },
//                 marks: {
//                   type: Number,
//                 },
//                 isCompleted: {
//                   type: String,
//                   enum: ["pass", "fail"],
//                 },
//               },
//             ],
//           },
//         ],
//       },
//     ],
//     result: {
//       type: String,
//       enum: ["pass", "fail"],
//     },
//     remarks: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// const marksCardModel = mongoose.model("Markscard", marksCardSchema);

// module.exports = marksCardModel;

// const mongoose = require('mongoose')

// const marksCardSchema = mongoose.Schema({
//     student_id: {
//         // type: mongoose.Schema.Types.ObjectId,
//         // ref: 'Student',
//         // required: true
//         type: String
//     },
//     updated_by: {
//         // type: mongoose.Schema.Types.ObjectId,
//         // ref: 'Faculty',
//         // required: true
//         type: String
//     },
//     marksCard_list: [
//         {
//             semister: {
//                 type: String,
//                 enum: [ "sem-1", "sem-2", "sem-3", "sem-4", "sem-5", "sem-6", "sem-7", "sem-8" ]
//             },
//             totalMarks: {
//                 type: Number
//             },
//             result: {
//                 type: String,
//                 enum: [ "pass", "fail" ]
//             },
//             remarks: {
//                 type: String
//             },
//             marks: [
//                 {
//                     subject: {
//                         type: String
//                     },
//                     marks: {
//                         type: Number
//                     },
//                     // isCompleted: {
//                     //     type: String,
//                     //     enum: [ "pass", "fail" ]
//                     // }
//                 }
//             ]
//         }
//     ]
// }, { timestamps: true })

// const marksCardModel = mongoose.model('Markscard', marksCardSchema)

// module.exports = marksCardModel

const mongoose = require("mongoose");
const marksCardSchema = mongoose.Schema(
  {
    student_id: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Student',
      // required: true
      type: String,
    },
    stud_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    updated_by: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Faculty',
      // required: true
      type: String,
    },
    marksCard_list: [
      // forecasts
      {
        semister: {
          type: String,
          enum: [
            "sem-1",
            "sem-2",
            "sem-3",
            "sem-4",
            "sem-5",
            "sem-6",
            "sem-7",
            "sem-8",
          ],
        },
        IA: [
          //levels
          {
            IA_type: {
              type: String,
              enum: ["IA-1", "IA-2"],
            },
            marks: [
              {
                subject: {
                  type: String,
                },
                marks: {
                  type: Number,
                },
                isCompleted: {
                  type: String,
                  enum: ["pass", "fail"],
                },
              },
            ],
          },
        ],
      },
    ],
    result: {
      type: String,
      enum: ["pass", "fail"],
    },
    remarks: { type: String },
  },
  { timestamps: true }
);

const marksCardModel = mongoose.model("Markscard", marksCardSchema);

module.exports = marksCardModel;
