import ChessBoard from 'components/ChessBoard/ChessBoard';

export default function Index() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-[1000px] h-[1000px]">
        <ChessBoard />
      </div>
    </div>
  );
}
