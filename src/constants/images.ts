// Unsplash placeholders used across mock screens.

const U = (id: string, w = 600, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;

export const IMGS = {
  // Editorial / mood
  editorialBlackJacket: U("1603189343302-e603f7add05a", 700, 900),
  editorialBlazer: U("1613915617430-8ab0fd7c6baf", 500, 700),
  editorialBWCoat: U("1681602642250-ee015eba94a3", 500, 800),
  editorialDarkCoat: U("1735480222193-3fe22ffd70b6", 700, 900),
  editorialFieldDress: U("1717764488252-71702b7acf7d", 600, 900),

  // Portraits
  portraitGray: U("1533392151650-269f96231f65", 500, 700),
  portraitBlazer: U("1629511565591-a1d494ad6c58", 500, 700),
  portraitBrown: U("1677715156741-b7af71207c4d", 500, 700),

  // Clothing — tops
  itemWhiteShirt: U("1612889002991-fbfaf775d231", 400, 520),
  itemCoat: U("1664029593173-183fbb854642", 400, 520),
  itemBlackPeacoat: U("1639270601211-9265bafae0f9", 400, 520),
  itemGraySuit: U("1622114684497-a9820f5ebc41", 400, 520),
  itemBrownShirt: U("1586689311267-e88bb0509995", 400, 520),

  // Clothing — bottoms
  itemBlackJeans: U("1718252540511-e958742e4165", 400, 400),
  itemJeansDetail: U("1633963643586-1a39077623be", 400, 520),

  // Shoes
  itemLoafers: U("1616406432452-07bc5938759d", 400, 380),
  itemBrownShoes: U("1675947258177-aa8120ddefa3", 400, 380),
  itemLeatherShoes: U("1563434564528-8fdf5996e622", 400, 380),

  // Accessories
  itemBlackBag: U("1758542988969-39a10168b2ce", 400, 440),
  itemBeltDetail: U("1755214832310-074c4cc45372", 400, 400),
  itemLeatherDetail: U("1614676471928-2ed0ad1061a4", 400, 400),

  // Wardrobe
  hangers: U("1490481651871-ab68de25d43d", 700, 500),
};
