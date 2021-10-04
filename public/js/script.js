const field = document.querySelector("#uploadField");
const fileBox = document.querySelector("#filebox");
const dropGraphics = document.querySelector("#drop");
const uploadGraphics = document.querySelector("#upload");
const defaultImage = document.querySelector("#nimage");
const success = document.querySelector("#success");
const text = document.querySelector("#text");
const browse = document.querySelector("#browse");
const text2 = document.querySelector("#text2");
const browse2 = document.querySelector("#browse2");
const button = document.querySelector("#copy");
const fr = document.querySelector("#fr");
const sr = document.querySelector("#sr");
button.addEventListener("click", () => {
  var copyText = document.getElementById("link");
  copyText.select();
  document.execCommand("copy");
  button.innerHTML = "Copied";
  setTimeout(() => {
    button.innerHTML = "Copy";
  }, 2000);
});
browse.addEventListener("click", (e) => {
  fileBox.click();
});
field.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (!field.classList.contains("special")) {
    field.classList.add("special");
    defaultImage.classList.add("none");
    dropGraphics.classList.add("initial");
  }
});
field.addEventListener("dragleave", (e) => {
  e.preventDefault();
  defaultImage.classList.remove("none");
  dropGraphics.classList.remove("initial");
  field.classList.remove("special");
});
field.addEventListener("drop", (e) => {
  e.preventDefault();
  field.classList.remove("special");
  defaultImage.classList.remove("none");
  dropGraphics.classList.remove("initial");
  fileBox.files = e.dataTransfer.files;
  upload();
});
fileBox.addEventListener("change", () => {
  upload();
});
function upload() {
  defaultImage.classList.add("none");
  dropGraphics.classList.remove("initial");
  text.classList.add("none");
  uploadGraphics.classList.add("initial");
  text.innerHTML = `<span id="browse"></span>`;
  const file = fileBox.files[0];
  const form = new FormData();
  form.append("myfile", file);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      var res = JSON.parse(xhr.response);
      uploadGraphics.classList.remove("initial");
      browse2.innerHTML = "Done";
      success.classList.add("initial");
      setTimeout(() => {
        text2.style.display = "none";
        fr.style.display = "none";
        sr.style.display = "grid";
        var link = document.getElementById("link");
        link.value = res.LINK;
        success.classList.remove("initial");
      }, 3000);
    }
  };
  xhr.upload.onprogress = showProgress;
  xhr.open("POST", "https://my-share-fie.herokuapp.com/api/upload/files");
  xhr.send(form);
}
const showProgress = (e) => {
  text2.style.display = "initial";
  browse2.innerHTML = parseInt((e.loaded / e.total) * 100) + "%";
};
