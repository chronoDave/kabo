import test from 'tape';

import Colour from './colour';

test('[colour.fromHex] creates colour from hex', t => {
  t.true(Colour.fromHex('#000') instanceof Colour, '3 letter /w hex');
  t.true(Colour.fromHex('#ffffff') instanceof Colour, '6 letter /w hex');
  t.true(Colour.fromHex('eee') instanceof Colour, '3 letter w/o hex');
  t.true(Colour.fromHex('bad1de') instanceof Colour, '6 letter w/o hex');

  t.end();
});

test('[colour.fromHex] throws on invalid hex', t => {
  try {
    Colour.fromHex('e');

    t.fail('Expected error');
  } catch (err) {
    t.pass((err as Error).message);
  }

  t.end();
});

test('[colour.luminance] returns relative luminance', t => {
  const black = Colour.fromHex('#000');
  const white = Colour.fromHex('#fff');
  const orange = Colour.fromHex('#fa7014');

  t.equal(black.luminance, 0, 'black');
  t.equal(white.luminance, 1, 'white');
  t.equal(Math.round(orange.luminance * 10000) / 10000, 0.3196);

  t.end();
});

test('[colour.hex] returns hex', t => {
  const black = new Colour({ r: 0, g: 0, b: 0 });
  const red = new Colour({ r: 255, g: 0, b: 0 });
  const darkTeal = new Colour({ r: 80, g: 108, b: 112 });

  t.equal(black.hex, '#000000', 'black');
  t.equal(red.hex, '#ff0000', 'red');
  t.equal(darkTeal.hex, '#506c70', 'dark teal');

  t.end();
});

test('[colour.contrast] returns colour contrast', t => {
  const black = Colour.fromHex('#000');
  const white = Colour.fromHex('#fff');
  const orange = Colour.fromHex('#fa7014');
  const darkTeal = Colour.fromHex('#506c70');

  t.equal(black.contrast(white), 21, 'bg: black | fg: white');
  t.equal(white.contrast(black), 21, 'bg: white | fg: black');
  t.equal(Math.round(black.contrast(orange) * 100) / 100, 7.39, 'bg: black | fg: orange');
  t.equal(Math.round(black.contrast(darkTeal) * 100) / 100, 3.72, 'bg: black | fg: dark teal');
  t.equal(Math.round(darkTeal.contrast(orange) * 100) / 100, 1.99, 'bg: dark teal | fg: orange');
  t.equal(Math.round(darkTeal.contrast(white) * 100) / 100, 5.65, 'bg: dark teal | fg: white');

  t.end();
});
