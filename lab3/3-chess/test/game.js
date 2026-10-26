import * as game from '../games/2022-03-07-game.json' with { type: 'json' };
import assert from 'assert';
import Color from '../src/color.js';
import Chessboard from '../src/chessboard.js';

/**
 * From a file number, get the corresponding letter.
 * Rank are 1-indexed.
 * Letters are 97-indexed to get lower-alpha characters.
 * @param {number} file - the file in its number representation.
 * @return {string} returns the file in its string representation.
 */
const convertFileToString = function (file) {
  return String.fromCharCode(97 - 1 + file);
};

describe('Game', function () {
  let chessboard;

  let lastCaptured = null;

  before(function () {
    chessboard = new Chessboard();
    chessboard.init();
  });

  describe('#move and #capture', function () {
    game.default.forEach((action) => {
      const color = Color[action.color.toUpperCase()];

      if (action.type === 'move') {
        const { from, to } = action;

        it(`${action.color} moves from ${convertFileToString(from.file)}${from.rank} to ${convertFileToString(to.file)}${to.rank}`, function () {
          const piece = chessboard.getPiece(from.rank, from.file);
          assert.ok(piece, 'there should be a piece at the starting cell');
          assert.equal(piece.color, color);

          assert.equal(piece.canMove(to.rank, to.file), true);


          lastCaptured = chessboard.getPiece(to.rank, to.file);
          piece.move(to.rank, to.file);

          assert.equal(piece.rank, to.rank);
          assert.equal(piece.file, to.file);
          assert.equal(chessboard.getPiece(to.rank, to.file), piece);
          assert.equal(chessboard.getPiece(from.rank, from.file), null);
        });
      } else {
        const { at } = action;

        it(`a ${action.color} piece is captured at ${convertFileToString(at.file)}${at.rank}`, function () {
          assert.ok(lastCaptured, 'the previous move should have captured a piece');

          assert.equal(lastCaptured.color, color);

          assert.equal(lastCaptured.isCaptured, true);
          assert.equal(chessboard.pieces.includes(lastCaptured), false);

          const occupant = chessboard.getPiece(at.rank, at.file);
          assert.ok(occupant);
          assert.notEqual(occupant.color, color);
        });
      }
    });
  });
});