describe('ticTacToeApp ', function() {

    var scope,
        controller
    ;

    beforeEach(function() {
        module('ticTacToeApp');
    });

    describe('TicTacToeController', function() {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('TicTacToeController', {
                '$scope': scope
            });
        }));

        it('should have a board', function() {
            expect(scope.board).toEqual([
                [ { value: '-' }, { value: '-' }, { value: '-' } ],
                [ { value: '-' }, { value: '-' }, { value: '-' } ],
                [ { value: '-' }, { value: '-' }, { value: '-' } ]
               ]
            );
        });

        it('should reset the game', function() {
            scope.board = [
                [ { value: 'X' }, { value: 'X' }, { value: 'X' } ],
                [ { value: 'X' }, { value: 'O' }, { value: '0' } ],
                [ { value: '0' }, { value: 'X' }, { value: 'O' } ]
              ];

             scope.reset();
            expect(scope.board[0][0]).toEqual({ value: '-' });
            expect(scope.board[0][1]).toEqual({ value: '-' });
            expect(scope.board[0][2]).toEqual({ value: '-' });
            expect(scope.board[1][0]).toEqual({ value: '-' });
            expect(scope.board[1][1]).toEqual({ value: '-' });
            expect(scope.board[1][2]).toEqual({ value: '-' });
            expect(scope.board[2][0]).toEqual({ value: '-' });
            expect(scope.board[2][1]).toEqual({ value: '-' });
            expect(scope.board[2][2]).toEqual({ value: '-' });
            expect(scope.currentPlayer).toEqual('X');
            expect(scope.winner).toEqual(false);
            expect(scope.draw).toEqual(false);
        });

        it('should set the first player to be X', function() {

            expect(scope.currentPlayer).toEqual('X');
        });

        it('should check who is the current player', function() {
            scope.move(scope.board[0][0]);
            scope.move(scope.board[1][0]);
            scope.move(scope.board[2][0]);

            expect(scope.currentPlayer).toEqual('O');
        });

        it('should not make move in the same cell', function() {
            scope.move(scope.board[1][1]);
            scope.move(scope.board[1][1]);

            expect(scope.cellTaken).toEqual(true);
            expect(scope.cellTakenMessage).toEqual("This space is taken, please choose again");
        });

        it('should check for Row win', function() {
            scope.board = [
                [ { value: 'X' }, { value: 'X' }, { value: 'X' } ],
                [ { value: 'X' }, { value: 'O' }, { value: '0' } ],
                [ { value: '0' }, { value: 'X' }, { value: 'O' } ]
              ];
    
             scope.checkForEndOfGame();
            expect(scope.winner).toEqual(true);
        });

        it('should check for Column win', function() {
            scope.board = [
                [ { value: 'X' }, { value: '-' }, { value: 'O' } ],
                [ { value: 'X' }, { value: 'O' }, { value: '-' } ],
                [ { value: 'X' }, { value: '-' }, { value: '-' } ]
              ];
    
             scope.checkForEndOfGame();
            expect(scope.winner).toEqual(true);
        });

        it('should check for Left Diagonal win', function() {
            scope.board = [
                [ { value: 'O' }, { value: '-' }, { value: 'O' } ],
                [ { value: 'X' }, { value: 'O' }, { value: '-' } ],
                [ { value: 'X' }, { value: '-' }, { value: 'O' } ]
              ];
    
             scope.checkForEndOfGame();
            expect(scope.winner).toEqual(true);
        });

        it('should check for Right Diagonal win', function() {
            scope.board = [
                [ { value: 'O' }, { value: '-' }, { value: 'X' } ],
                [ { value: 'X' }, { value: 'X' }, { value: '-' } ],
                [ { value: 'X' }, { value: '-' }, { value: 'O' } ]
              ];
    
             scope.checkForEndOfGame();
            expect(scope.winner).toEqual(true);
        });

        it('should check for Draw', function() {
            scope.board = [
                [ { value: 'X' }, { value: 'X' }, { value: 'O' } ],
                [ { value: 'O' }, { value: 'X' }, { value: 'X' } ],
                [ { value: 'X' }, { value: 'O' }, { value: 'O' } ]
              ];
    
             scope.checkForEndOfGame();
            expect(scope.draw).toEqual(true);
        });

        it('should check if board is full', function() {
            scope.board = [
                [ { value: 'X' }, { value: 'X' }, { value: 'X' } ],
                [ { value: '0' }, { value: 'X' }, { value: '0' } ],
                [ { value: '0' }, { value: 'X' }, { value: 'X' } ]
              ];
            expect(scope.isBoardFull()).toEqual(true);
        });
       
    });
});
