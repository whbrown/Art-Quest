function gotoMap(gallery) {
  const genRange = (start, end) => {
    let arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i.toString());
    }
    return arr;
  };
  const level5Galleries = ['926'];
  const level3Galleries = genRange(708, 716)
    .concat(genRange(219, 222))
    .concat(genRange(251, 253));
  const level2Galleries = genRange(173, 176)
    .concat(genRange(200, 250))
    .concat(genRange(400, 406))
    .concat(genRange(450, 464))
    .concat(genRange(600, 699))
    .concat(genRange(703, 722))
    .concat(genRange(747, 772))
    .concat(genRange(800, 830))
    .concat(genRange(917, 925))
    .concat(['851', '899', '999']);
  const level1MGalleries = genRange(914, 916)
    .concat(genRange(170, 172))
    .concat(genRange(773, 774));
  const levelGGalleries = genRange(980, 981).concat(genRange(963, 965));
  if (level5Galleries.includes(gallery)) return `/images/met-map/MetMap5.png`;
  if (level3Galleries.includes(gallery)) return `/images/met-map/MetMap3.png`;
  if (level2Galleries.includes(gallery)) return `/images/met-map/MetMap2.png`;
  if (level1MGalleries.includes(gallery)) return `/images/met-map/MetMap1M.png`;
  if (levelGGalleries.includes(gallery)) return `/images/met-map/MetMapG.png`;
  return `/images/met-map/MetMap1.png`;
}

module.exports = gotoMap;
