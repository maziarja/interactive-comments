import data from "../../data.json";
// time for replacing createdAt on data.json
const now = Date.now();
const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000; // approx 1 month
const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000; // 2 weeks
const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000; // 1 week
const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000; // 2 days

export const getData = function () {
  return data;
};

const id = function () {
  let totalCm = data.comments.length;
  data.comments.forEach((cm) => (totalCm += cm.replies.length));
  return +totalCm;
};
export const addComments = function (text) {
  const newComment = {
    // fix this
    id: id() + 1,
    content: `${text}`,
    createdAt: Date.now(),
    score: 0,
    user: {
      image: {
        png: `${data.currentUser.image.png}`,
        webp: `${data.currentUser.image.webp}`,
      },
      username: `${data.currentUser.username}`,
    },
    replies: [],
  };
  data.comments.push(newComment);
};

export const addReply = function (text, commentId, replyId) {
  const comment = data.comments.find((cm) => cm.id === commentId);
  const replyToReplyData = data.comments.map((cm) =>
    cm.replies.find((reply) => reply.id === replyId)
  );
  const replyToReply = replyToReplyData.find((reply) => reply !== undefined);
  const newReply = {
    id: id() + 1,
    content: `${text
      .split(replyToReply ? replyToReply.user.username : comment.user.username)
      .pop()}`,
    createdAt: Date.now(),
    score: 0,
    replyingTo: `${
      replyToReply ? replyToReply.user.username : comment.user.username
    }`,

    user: {
      image: {
        png: `${data.currentUser.image.png}`,
        webp: `${data.currentUser.image.webp}`,
      },
      username: `${data.currentUser.username}`,
    },
  };
  comment.replies.push(newReply);
};

export const editComment = function (output) {
  if (output.element.classList.contains("comments")) {
    const elData = data.comments.find((cm) => {
      return cm.id === +output.element.id;
    });
    elData.content = output.text;
  }
  if (output.element.classList.contains("reply")) {
    const ele = data.comments.map((cm) =>
      cm.replies.find((reply) => {
        return reply.id === +output.element.id;
      })
    );
    const elData = ele.find((el) => el !== undefined);
    elData.content = output.text;
  }
};

export const deleteComment = function (element) {
  if (element.classList.contains("comments")) {
    const index = data.comments.findIndex((cm) => cm.id === +element.id);
    data.comments.splice(index, 1);
  }
  if (element.classList.contains("reply")) {
    const cmEl = data.comments.find((cm) => {
      return cm.replies.find((reply) => reply.id === +element.id);
    });

    const index = cmEl.replies.findIndex((reply) => reply.id === +element.id);
    cmEl.replies.splice(index, 1);
  }
};

export const increaseComments = function (element, rankNum) {
  if (element.classList.contains("comments")) {
    const cmData = data.comments.find((cm) => cm.id === +element.id);
    if (cmData.rated) return;
    if (cmData.score - +rankNum < 1) {
      cmData.score = cmData.score + 1;
    }
    cmData.rated = true;
  }
  if (element.classList.contains("reply")) {
    const cmEl = data.comments.find((cm) => {
      return cm.replies.find((reply) => reply.id === +element.id);
    });
    const replyData = cmEl.replies.find((reply) => reply.id === +element.id);
    if (replyData.rated) return;
    if (replyData.score - +rankNum < 1) {
      replyData.score = replyData.score + 1;
    }
    replyData.rated = true;
  }
};

export const decreaseComments = function (element, rankNum) {
  if (element.classList.contains("comments")) {
    const cmData = data.comments.find((cm) => cm.id === +element.id);
    if (cmData.rated) return;
    if (+rankNum - cmData.score < 1) {
      cmData.score = cmData.score - 1;
    }
    cmData.rated = true;
  }
  if (element.classList.contains("reply")) {
    const cmEl = data.comments.find((cm) => {
      return cm.replies.find((reply) => reply.id === +element.id);
    });
    const replyData = cmEl.replies.find((reply) => reply.id === +element.id);
    if (replyData.rated) return;
    if (+rankNum - replyData.score < 1) {
      replyData.score = replyData.score - 1;
    }
    replyData.rated = true;
  }
};
