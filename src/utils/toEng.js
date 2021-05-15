const toEng = (str) => {
  str = str.replace(/^\s+|\s+$/g, ""); //trim
  str = str.toLowerCase();

  const from =
    "aáàảạãăẳắặằẵâấầậẩẫeèéẻẹẽêếềễểệiíỉịĩìyỳỹỷỵýuùúủụũưứừửựũoóòỏọõôốồổộỗơớờởợõđ";
  const to =
    "aaaaaaaaaaaaaaaaaaeeeeeeeeeeeeiiiiiiyyyyyyuuuuuuuuuuuuooooooooooooooooood";

  for (let i = 0; i < from.length; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  return str;
};

module.exports = toEng;
