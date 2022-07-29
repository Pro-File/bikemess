import { message } from "antd";
import { auth, storage } from "../Services/firebaseConfig";

const uploadImage = async ({ id, file }) => {
  let uploading;
  let fileUrl;

  uploading = storage().ref(`assets/${id}`);
  const task = uploading.put(file, {
    contentType: `${file.type}`,
  });
  await task
    .then(() =>
      uploading.getDownloadURL().then((url) => {
        fileUrl = url;
      })
    )
    .catch(() => {
      message.error("Some thing went wrong");
    });
  return fileUrl;
};

export const checkPostalCode = (code) => {
  const re = /^[0-9]{4,6}$/;
  return re.test(code);
};

export const checkURL = (code) => {
  const re =
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
  return re.test(code);
};

export const login = ({ email, password }) =>
  auth().signInWithEmailAndPassword(email, password);

const confirmOldPassword = (oldPassword) => {
  const user = auth().currentUser;
  const credential = auth.EmailAuthProvider.credential(
    auth().currentUser.email,
    oldPassword
  );
  return user.reauthenticateWithCredential(credential);
};
const setNewPassword = (newPassword) => {
  const user = auth().currentUser;
  return user.updatePassword(newPassword);
};

export const global = {
  uploadImage,
  login,
  setNewPassword,
  confirmOldPassword,
};
