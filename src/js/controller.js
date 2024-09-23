"use strict";
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import view from "./view.js";

const data = model.getData();

controlWriteComments = function () {
  const text = view._writeComments();
  model.addComments(text);
  view._renderComment(data);
  view._renderAllReplies(data);
};

controlRenderReplyTextArea = function (e) {
  view._renderTextAreaOnComments(e, data);
};

const controlReplyToComment = function (e) {
  const element = view._renderNewReplyOnComment(e, data);
  if (!element) return;
  model.addReply(element.text, element.commentId, element.replyId);
  view._renderReply(data);
};

const controlUpdateComment = function (e) {
  const output = view._updateComments(e);
  model.editComment(output);
};

const controlDeleteComments = function (e) {
  const element = view._deleteComments(e);
  // delete data
  model.deleteComment(element);
  // rendet data
  view._renderComment(data);
  view._renderAllReplies(data);
};

const controlRateIncreaseComments = function (element, rankNum) {
  model.increaseComments(element, rankNum);
  // render comments
  view._renderComment(data);
  // render replies
  view._renderAllReplies(data);
};

const controlRateDecreaseComments = function (element, rankNum) {
  model.decreaseComments(element, rankNum);
  // render comments
  view._renderComment(data);
  // render replies
  view._renderAllReplies(data);
};

const init = function () {
  view._editComments();
  view._clickOndeleteBtn();
  view._noOnModal();
  // render comments
  view._renderComment(data);
  // render text area if reply on comments clicked
  view._addHandlerClickReplyOnComments(controlRenderReplyTextArea);
  // writing a new comment
  view._addHandlerWriteComments(controlWriteComments);
  // render new reply if replyBtn clicked
  view._addHandlerReplyToComments(controlReplyToComment);
  // render All the replies
  view._renderAllReplies(data);
  // update a comment
  view._addHandlerClickOnUpdate(controlUpdateComment);
  // delete a comment
  view._addHandlerDeleteComments(controlDeleteComments);
  // increase a comment
  view._addHandlerRateIncreaseComments(controlRateIncreaseComments);
  // decrease a comment
  view._addHandlerRateDecreaseComments(controlRateDecreaseComments);
};

init();
