angular.module('ticTacToeApp', [])
    .controller('TicTacToeController', function TicTacToeController($scope) {

        function getBoard() {
            $scope.board = [];
            for (var i = 0; i < 3; i++) {
                var row = [];
                for (var j = 0; j < 3; j++) {
                    row.push({ value: '-' });
                }
                $scope.board.push(row);
            }
        };  
        
        $scope.reset = function () {
            $scope.currentPlayer = 'X';
            $scope.winner = false;
            $scope.draw = false;
            getBoard() ;
        };
        $scope.reset();

        $scope.isTaken = function (cell) {
            return cell.value !== '-';
        };

        function checkForMatch(cell1, cell2, cell3) {
            return cell1.value === cell2.value &&
                cell1.value === cell3.value &&
                cell1.value !== '-';
        };

        $scope.isBoardFull = function() {
            for (var row = 0; row <= 2; row++) {
                for (var col = 0; col <= 2; col++) {
                    if ($scope.board[row][col].value === '-') {
                        return false;
                    }
                }
            }
            return true;
        }

        $scope.checkForEndOfGame = function () {
            var rowWin = checkForMatch($scope.board[0][0], $scope.board[0][1], $scope.board[0][2]) ||
                checkForMatch($scope.board[1][0], $scope.board[1][1], $scope.board[1][2]) ||
                checkForMatch($scope.board[2][0], $scope.board[2][1], $scope.board[2][2]);

            var columnWin = checkForMatch($scope.board[0][0], $scope.board[1][0], $scope.board[2][0]) ||
                checkForMatch($scope.board[0][1], $scope.board[1][1], $scope.board[2][1]) ||
                checkForMatch($scope.board[0][2], $scope.board[1][2], $scope.board[2][2]);

            var diagonalWin = checkForMatch($scope.board[0][0], $scope.board[1][1], $scope.board[2][2]) ||
                checkForMatch($scope.board[2][0], $scope.board[1][1], $scope.board[0][2]);

            $scope.winner = rowWin || columnWin || diagonalWin;
            $scope.draw = $scope.winner === false && $scope.isBoardFull();
            return $scope.winner || $scope.draw;
        };

        $scope.move = function (cell) {
            $scope.cellTaken = false;
            $scope.cellTakenMessage = "This space is taken, please choose again";
            if($scope.isTaken(cell))
            {
                $scope.cellTaken = true;
                $scope.cellTakenMessage;
                return $scope.currentPlayer;
            }
            cell.value = $scope.currentPlayer;
            if ($scope.checkForEndOfGame() === false) {
                $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
            }
        };

    });

   