import { snackbarActions as snackbar } from "material-ui-snackbar-redux";
import history from "../../app/common/util/history";

export const updateLesson = lesson => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    dispatch({ type: "STARTED_POSTING" });

    await firestore
      .collection("lessons")
      .doc(lesson.doc)
      .set({
        Grade: lesson.grade ? lesson.grade : null,
        Subjects: lesson.subject ? lesson.subject : null,
        Period: lesson.period ? lesson.period : null,
        closure: lesson.closure ? lesson.closure : null,
        direct_instruction: lesson.direct_instruction
          ? lesson.direct_instruction
          : null,
        file1: lesson.fileURL ? lesson.fileURL : null,
        guided_practice: lesson.guided_practice ? lesson.guided_practice : null,
        hook: lesson.hook ? lesson.hook : null,
        learning_goals: lesson.learning_goals ? lesson.learning_goals : null,
        materials: lesson.materials ? lesson.materials : null,
        notes: lesson.notes ? lesson.notes : null,
        post_title: lesson.title ? lesson.title : null,
        standards: lesson.standards ? lesson.standards : null,
        rationale: lesson.rationale ? lesson.rationale : null,
        post_author: lesson.post_author,
        post_status: "publish",
        post_date: new Date(),
        customs: lesson.customs ? lesson.customs : null
      })
      .then(() => {
        dispatch({ type: "CREATE_LESSON", lesson });
      })
      .catch(err => {
        dispatch({ type: "CREATE_LESSON_ERROR", err });
        dispatch(
          snackbar.show({
            message: err.message,
            action: "Close",
            variant: "error",
            handleAction: () => {
              /* do something... */
            }
          })
        );
      });

    dispatch(
      snackbar.show({
        message: "Your lesson has been updated!",
        action: "Close",
        variant: "success",
        handleAction: () => {
          /* do something... */
        }
      })
    );
    dispatch(() => {
      history.push("/dashboard");
    });
  };
};

export const createLesson = lesson => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    dispatch({ type: "STARTED_POSTING" });

    await firestore
      .collection("lessons")
      .add({
        Grade: lesson.grade ? lesson.grade : null,
        Subjects: lesson.subject ? lesson.subject : null,
        Period: lesson.period ? lesson.period : null,
        closure: lesson.closure ? lesson.closure : null,
        direct_instruction: lesson.direct_instruction
          ? lesson.direct_instruction
          : null,
        file1: lesson.fileURL ? lesson.fileURL : null,
        guided_practice: lesson.guided_practice ? lesson.guided_practice : null,
        hook: lesson.hook ? lesson.hook : null,
        learning_goals: lesson.learning_goals ? lesson.learning_goals : null,
        materials: lesson.materials ? lesson.materials : null,
        notes: lesson.notes ? lesson.notes : null,
        post_title: lesson.title ? lesson.title : null,
        standards: lesson.standards ? lesson.standards : null,
        rationale: lesson.rationale ? lesson.rationale : null,
        post_author: lesson.authoruid,
        post_status: "publish",
        post_date: new Date(),
        customs: lesson.customs ? lesson.customs : null
      })
      .then(() => {
        dispatch({ type: "CREATE_LESSON", lesson });
      })
      .catch(err => {
        dispatch({ type: "CREATE_LESSON_ERROR", err });
        dispatch(
          snackbar.show({
            message: err.message,
            action: "Close",
            variant: "error",
            handleAction: () => {
              /* do something... */
            }
          })
        );
      });

    dispatch({ type: "FINISHED_POSTING" });
    dispatch(
      snackbar.show({
        message: "Your lesson has been posted!",
        action: "Close",
        variant: "success",
        handleAction: () => {
          /* do something... */
        }
      })
    );

    dispatch(() => {
      history.push("/dashboard");
    });
  };
};

export const saveLesson = lesson => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    dispatch({ type: "STARTED_POSTING" });
    if (lesson.doc) {
      await firestore
        .collection("lessons")
        .doc(lesson.doc)
        .set({
          Grade: lesson.grade ? lesson.grade : null,
          Subjects: lesson.subject ? lesson.subject : null,
          Period: lesson.period ? lesson.period : null,
          closure: lesson.closure ? lesson.closure : null,
          direct_instruction: lesson.direct_instruction
            ? lesson.direct_instruction
            : null,
          file1: lesson.fileURL ? lesson.fileURL : null,
          guided_practice: lesson.guided_practice
            ? lesson.guided_practice
            : null,
          hook: lesson.hook ? lesson.hook : null,
          learning_goals: lesson.learning_goals ? lesson.learning_goals : null,
          materials: lesson.materials ? lesson.materials : null,
          notes: lesson.notes ? lesson.notes : null,
          post_title: lesson.title ? lesson.title : null,
          standards: lesson.standards ? lesson.standards : null,
          rationale: lesson.rationale ? lesson.rationale : null,
          post_author: lesson.authoruid ? lesson.authoruid : lesson.post_author,
          post_status: "wip",
          post_date: new Date(),
          customs: lesson.customs ? lesson.customs : null
        })
        .then(() => {
          dispatch({ type: "CREATE_LESSON", lesson });
          dispatch(() => {
            history.push("/dashboard");
          });
        })
        .catch(err => {
          dispatch({ type: "CREATE_LESSON_ERROR", err });
        });
    } else {
      await firestore
        .collection("lessons")
        .add({
          Grade: lesson.grade ? lesson.grade : null,
          Subjects: lesson.subject ? lesson.subject : null,
          Period: lesson.period ? lesson.period : null,
          closure: lesson.closure ? lesson.closure : null,
          direct_instruction: lesson.direct_instruction
            ? lesson.direct_instruction
            : null,
          file1: lesson.fileURL ? lesson.fileURL : null,
          guided_practice: lesson.guided_practice
            ? lesson.guided_practice
            : null,
          hook: lesson.hook ? lesson.hook : null,
          learning_goals: lesson.learning_goals ? lesson.learning_goals : null,
          materials: lesson.materials ? lesson.materials : null,
          notes: lesson.notes ? lesson.notes : null,
          post_title: lesson.title ? lesson.title : null,
          standards: lesson.standards ? lesson.standards : null,
          rationale: lesson.rationale ? lesson.rationale : null,
          post_author: lesson.authoruid ? lesson.authoruid : lesson.post_author,
          post_status: "wip",
          post_date: new Date()
        })
        .then(() => {
          dispatch({ type: "CREATE_LESSON", lesson });
          dispatch(() => {
            history.push("/dashboard");
          });
        })
        .catch(err => {
          dispatch({ type: "CREATE_LESSON_ERROR", err });
        });
    }

    dispatch({ type: "FINISHED_POSTING" });
  };
};

export const deleteLesson = lesson => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    // let tobeDeleted = firebase.storage().refFromURL(this.state.fileURL);

    // tobeDeleted
    //   .delete()
    //   .then(() => {
    //     console.log("File Deleted Successfully");
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    if (lesson.file1) {
      let tobeDeleted = firebase.storage().refFromURL(lesson.file1);
      tobeDeleted
        .delete()
        .then(() => {
          console.log("File Deleted Successfully");
        })
        .catch(err => {
          console.log(err);
        });
    }
    if (lesson.fileURL) {
      let tobeDeleted = firebase.storage().refFromURL(lesson.fileURL);
      tobeDeleted
        .delete()
        .then(() => {
          console.log("File Deleted Successfully");
        })
        .catch(err => {
          console.log(err);
        });
    }

    await firestore
      .collection("lessons")
      .doc(lesson.doc)
      .delete()
      .then(() => {
        dispatch(
          snackbar.show({
            message: "Your lesson has been deleted.",
            action: "Close",
            variant: "success",
            handleAction: () => {
              /* do something... */
            }
          })
        );
        dispatch(() => {
          history.push("/dashboard");
        });
      })
      .catch(err => {
        dispatch(
          snackbar.show({
            message: err,
            action: "Close",
            variant: "success",
            handleAction: () => {
              /* do something... */
            }
          })
        );
      });
  };
};
