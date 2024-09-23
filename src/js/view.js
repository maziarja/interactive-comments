import amyrobsonImg from "../../images/avatars/image-amyrobson.png";
import juliusomoImg from "../../images/avatars/image-juliusomo.png";
import maxblagunImg from "../../images/avatars/image-maxblagun.png";
import ramsesmironImg from "../../images/avatars/image-ramsesmiron.png";
const imageMap = {
  "image-amyrobson.png": amyrobsonImg,
  "image-juliusomo.png": juliusomoImg,
  "image-maxblagun.png": maxblagunImg,
  "image-ramsesmiron.png": ramsesmironImg,
};
function formatDate(dateInput) {
  const date = new Date(dateInput);
  const now = new Date();
  const diffTime = Math.abs(now - date); // Difference in milliseconds
  const diffSeconds = Math.floor(diffTime / 1000); // Convert to seconds
  const diffMinutes = Math.floor(diffSeconds / 60); // Convert to minutes
  const diffHours = Math.floor(diffMinutes / 60); // Convert to hours
  const diffDays = Math.floor(diffHours / 24); // Convert to days
  const diffWeeks = Math.floor(diffDays / 7); // Convert to weeks
  const diffMonths = Math.floor(diffDays / 30); // Convert to months (approximation)

  if (diffSeconds < 5) {
    return "now";
  } else if (diffSeconds < 60) {
    return `${diffSeconds} seconds ago`;
  } else if (diffMinutes < 60) {
    return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
  } else if (diffDays < 7) {
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  } else if (diffWeeks < 5) {
    return diffWeeks === 1 ? "1 week ago" : `${diffWeeks} weeks ago`;
  } else if (diffMonths < 12) {
    return diffMonths === 1 ? "1 month ago" : `${diffMonths} months ago`;
  } else {
    return date.toLocaleDateString();
  }
}
class App {
  _comment;
  _commentEl;
  _commentFromReply;
  _replyToReply;
  _elementForDelete;
  ////////////// RENDER COMMENT ////////////////////
  _renderComment(data) {
    // clear
    document.querySelector(".cm__container").innerHTML = "";
    data.comments.forEach((cm) => {
      const imageName = cm.user.image.png.split("/").pop();
      const markupComment = ` 
        <section class="comments" id='${cm.id}' contenteditable="false">
           <div class="top-part">
             <img
               src='${imageMap[imageName]}'
               alt="avatar"
               class="avatar"
             />
             <p class="id">${cm.user.username}</p>
                ${
                  data.currentUser.username === cm.user.username
                    ? '<p class="you">you</p>'
                    : ""
                }  
             <p class="time">${formatDate(cm.createdAt)}</p>
           </div>
           <p class="comments__text">${cm.content}
           </p>
           <div class="rank__container">
             <button class="plus__btn">
               <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                 <path
                   d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                   fill="#C5C6EF"
                 />
               </svg>
             </button>
             <p class="rank__num">${cm.score}</p>
             <button class="minus__btn">
               <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                 <path
                   d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                   fill="#C5C6EF"
                 />
               </svg>
             </button>
           </div>
                 ${
                   data.currentUser.username === cm.user.username
                     ? `<div class="delete-edit-container">
                  <button class="delete">Delete</button>
                  <button class="edit">Edit</button>
                </div>`
                     : '<button class="btn__reply">Reply</button>'
                 }
                  ${
                    data.currentUser.username === cm.user.username
                      ? '<button class="btn__update hidden">UPDATE</button>'
                      : ""
                  }  
         </section>
         <div class="reply-wrapper"></div>
    `;
      document
        .querySelector(".cm__container")
        .insertAdjacentHTML("beforeend", markupComment);
    });
  }
  ////////////// RENDER ALL REPLIES FOR ALL COMMENTS ////////////////////
  _renderAllReplies(data) {
    data.comments.forEach((cm) =>
      cm.replies.forEach((reply) => {
        const imageName = reply.user.image.png.split("/").pop();
        const markupReply = `
              <section class="reply" id='${reply.id}'>
                <div class="top-part">
                  <img
                    src="${imageMap[imageName]}"
                    alt="avatar"
                    class="avatar"
                  />
                  <p class="id">${reply.user.username}</p>
               ${
                 data.currentUser.username === reply.user.username
                   ? '<p class="you">you</p>'
                   : ""
               }  
                  <p class="time">${formatDate(reply.createdAt)}</p>
                </div>
                <p class="comments__text">
                  <span class="reply-to">@${reply.replyingTo}</span>
                  ${reply.content}
                </p>
                <div class="rank__container">
                  <button class="plus__btn">
                    <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                        fill="#C5C6EF"
                      />
                    </svg>
                  </button>
                  <p class="rank__num">${reply.score}</p>
                  <button class="minus__btn">
                    <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                        fill="#C5C6EF"
                      />
                    </svg>
                  </button>
                </div>
                ${
                  data.currentUser.username === reply.user.username
                    ? `<div class="delete-edit-container">
                    <button class="delete">Delete</button>
                    <button class="edit">Edit</button>
                  </div>`
                    : '<button class="btn__reply">Reply</button>'
                }
                  ${
                    data.currentUser.username === reply.user.username
                      ? '<button class="btn__update hidden">UPDATE</button>'
                      : ""
                  }  
              </section>
        `;
        const cmEl = Array.from(document.querySelectorAll(".comments")).find(
          (cmEl) => +cmEl.id === cm.id
        );
        cmEl.nextElementSibling.insertAdjacentHTML("beforeend", markupReply);
      })
    );
  }
  ////////////// RENDER REPLY ////////////////////
  _renderReply(data) {
    if (document.querySelector(".write__reply")) {
      document.querySelector(".write__reply").value = "";
      document.querySelector(".write__reply").style.display = "none";
    }
    if (this._commentEl) this._commentEl.nextElementSibling.innerHTML = "";
    this._comment.replies.forEach((reply) => {
      const imageName = reply.user.image.png.split("/").pop();
      const markupReply = `
            <section class="reply" id='${reply.id}'>
              <div class="top-part">
                <img
                  src="${imageMap[imageName]}"
                  alt="avatar"
                  class="avatar"
                />
                <p class="id">${reply.user.username}</p>
             ${
               data.currentUser.username === reply.user.username
                 ? '<p class="you">you</p>'
                 : ""
             }  
                <p class="time">${formatDate(reply.createdAt)}</p>
              </div>
              <p class="comments__text">
                <span class="reply-to">@${reply.replyingTo}</span>
                 ${reply.content}
              </p>
              <div class="rank__container">
                <button class="plus__btn">
                  <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                      fill="#C5C6EF"
                    />
                  </svg>
                </button>
                <p class="rank__num">${reply.score}</p>
                <button class="minus__btn">
                  <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                      fill="#C5C6EF"
                    />
                  </svg>
                </button>
              </div>
              ${
                data.currentUser.username === reply.user.username
                  ? `<div class="delete-edit-container">
                  <button class="delete">Delete</button>
                  <button class="edit">Edit</button>
                </div>`
                  : '<button class="btn__reply">Reply</button>'
              }
                ${
                  data.currentUser.username === reply.user.username
                    ? '<button class="btn__update hidden">UPDATE</button>'
                    : ""
                }  
            </section>
      `;
      this._commentEl.nextElementSibling.insertAdjacentHTML(
        "beforeend",
        markupReply
      );
    });
  }
  ////////////// CLICK ON REPLY ON A COMMENT ////////////////////
  _renderTextAreaOnComments(e, data) {
    const replyBtn = e.target.closest(".btn__reply");
    const main = e.target.closest(".main");
    // click on everything except main
    if (!main) {
      document.querySelector(".write__comment").style.display = "grid";
      document.querySelectorAll(".write__reply").forEach((el) => el.remove());
    }
    if (!replyBtn) return;
    // just click on replyBtn
    document.querySelectorAll(".write__reply").forEach((el) => el.remove());
    const imageName = data.currentUser.image.png.split("/").pop();
    const commentEl = e.target.closest(".comments");
    const replyEl = e.target.closest(".reply");
    // if (!commentEl) return;
    // if (!replyEl) return;
    this._commentEl = commentEl;
    const index = data.comments.findIndex((cm) => cm.id === +commentEl?.id);
    const comment = data.comments[index];
    this._comment = comment;
    const reply = data.comments.map((cm) => {
      if (cm.replies.length > 0) {
        return cm.replies.find((reply) => reply.id === +replyEl?.id);
      }
    });
    const replyToReplyData = reply.find((r) => r !== undefined);
    const commentRelatedToReply = data.comments.find((cm) =>
      cm.replies.find((reply) => reply.id === +replyEl?.id)
    );
    const commentRelatedToReplyEl = Array.from(
      document.querySelectorAll(".comments")
    ).find((cm) => +cm.id === +commentRelatedToReply?.id);
    if (commentRelatedToReply) this._comment = commentRelatedToReply;
    if (replyEl) this._commentEl = commentRelatedToReplyEl;
    this._commentFromReply = commentRelatedToReply;
    this._replyToReply = replyToReplyData;
    const replyTo = data.comments[index]?.user.username;
    const replyToReplyReplyTo = replyToReplyData?.user.username;
    const markup = `
      <section class="write__reply">
      <textarea id="write" placeholder="Add a comment...">@${
        commentEl ? replyTo : replyToReplyReplyTo
      } </textarea>
      <img
      src="${imageMap[imageName]}"
      alt="avatar"
      class="avatar"
      />
      <button class="btn-send__reply">REPLY</button>
      </section>
      `;

    if (document.getElementById(commentEl?.id)?.nextElementSibling === null) {
      document.querySelector(".write__comment").style.display = "none";
    } else {
      document.querySelector(".write__comment").style.display = "grid";
    }

    if (commentEl)
      document
        .getElementById(commentEl.id)
        .nextElementSibling.insertAdjacentHTML("afterbegin", markup);
    if (replyEl) replyEl.insertAdjacentHTML("afterend", markup);
  }

  ////////////// WRITE A COMMENT ////////////////////
  _writeComments() {
    // get the text
    const text = document.getElementById("write").value;
    // clear the value
    document.getElementById("write").value = "";
    return text;
  }
  ////////////// RENDER NEW REPLY ON A COMMENT ////////////////////
  _renderNewReplyOnComment(e, data) {
    const sendReplyBtn = e.target.closest(".btn-send__reply");
    if (!sendReplyBtn) return;
    // update render comments
    const text = document.getElementById("write").value;
    return {
      text: text,
      commentId: this._comment?.id,
      replyId: this._replyToReply?.id,
    };
  }
  ////////////// CLICK ON EDIT ON A COMMENT ////////////////////
  _editComments() {
    document.body.addEventListener("click", (e) => {
      const edit = e.target.closest(".edit");
      const el = edit?.closest("section");
      if (!edit) return;
      if (!el) return;
      // making element editable
      el.querySelector(".comments__text").setAttribute(
        "contentEditable",
        "true"
      );
      el.querySelector(".reply-to")?.setAttribute("contenteditable", "false");
      // border
      el.querySelector(".comments__text").style.border =
        "1px solid hsl(238, 40%, 52%)";
      // padding
      el.querySelector(".comments__text").style.padding = `${1}rem`;
      // some style
      if (window.innerWidth < 700)
        document.querySelector(".delete-edit-container").style.top = `${68}%`;
      // cursor
      el.querySelector(".comments__text").style.cursor = "pointer";

      el.querySelector(".btn__update").classList.remove("hidden");
    });
  }
  //////////////  UPDATE A COMMENT ////////////////////
  _updateComments(e) {
    const el = e.target.closest("section");
    const textEl = el.querySelector(".comments__text");
    // making element un editable
    textEl.setAttribute("contentEditable", "false");
    // no border
    textEl.style.border = "none";
    // padding
    textEl.style.padding = `${1}rem`;
    // no cursor
    el.querySelector(".comments__text").style.cursor = "auto";
    // hide update btn
    el.querySelector(".btn__update").classList.add("hidden");
    const newText =
      textEl.childNodes[textEl.childNodes.length - 1].textContent.trim();
    return {
      element: el,
      text: newText,
    };
  }
  //////////////  DELETE A COMMENT ////////////////////
  _clickOndeleteBtn() {
    document.body.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".delete");
      const el = e.target.closest("section");
      if (!deleteBtn) return;
      if (!el) return;
      this._elementForDelete = el;
      // open modal
      document.querySelector(".modal").classList.remove("hidden");
      document.querySelector(".overlay").classList.remove("hidden");
    });
  }
  ////////////// HIDE MODAL FUNCTION  ////////////////////
  _hideModal() {
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");
  }
  ////////////// NO ON MODAL ////////////////////
  _noOnModal() {
    document.body.addEventListener("click", (e) => {
      const btnNo = e.target.closest(".modal-btn-no");
      if (!btnNo) return;
      this._hideModal();
    });
  }
  ////////////// YES ON MODAL (DELETE A COMMENT) ////////////////////
  _deleteComments(e) {
    this._hideModal();
    return this._elementForDelete;
  }

  //////////////  HANDLER CLICK ON REPLY ON A COMMENT ////////////////////
  _addHandlerClickReplyOnComments(handler) {
    document.body.addEventListener("click", (e) => {
      e.preventDefault();
      handler(e);
    });
  }
  ////////////// HANDLER WRITE A COMMENT ////////////////////
  _addHandlerWriteComments(handler) {
    document.querySelector(".btn__send").addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }
  //////////////  HANDLER REPLY TO A COMMENT ////////////////////
  _addHandlerReplyToComments(handler) {
    document.body.addEventListener("click", (e) => {
      e.preventDefault();
      handler(e);
    });
  }
  ////////////// HANDLER CLICK ON UPDATE COMMENTS ////////////////////
  _addHandlerClickOnUpdate(handler) {
    document.body.addEventListener("click", (e) => {
      const updateBtn = e.target.closest(".btn__update");
      if (!updateBtn) return;
      handler(e);
    });
  }
  ////////////// HANDLER YES ON MODAL (DELETE A COMMENT) ////////////////////
  _addHandlerDeleteComments(handler) {
    document.body.addEventListener("click", (e) => {
      const btnYes = e.target.closest(".modal-btn-yes");
      if (!btnYes) return;
      handler(e);
    });
  }
  ////////////// HANDLER CLICK ON +  ////////////////////
  _addHandlerRateIncreaseComments(handler) {
    document.body.addEventListener("click", (e) => {
      const plusBtn = e.target.closest(".plus__btn");
      if (!plusBtn) return;
      const element = e.target.closest("section");
      const rankNum = element.querySelector(".rank__num").textContent;
      handler(element, rankNum);
    });
  }
  ////////////// HANDLER CLICK ON -  ////////////////////
  _addHandlerRateDecreaseComments(handler) {
    document.body.addEventListener("click", (e) => {
      const minusBtn = e.target.closest(".minus__btn");
      if (!minusBtn) return;
      const element = e.target.closest("section");
      const rankNum = element.querySelector(".rank__num").textContent;
      handler(element, rankNum);
    });
  }
}

export default new App();
