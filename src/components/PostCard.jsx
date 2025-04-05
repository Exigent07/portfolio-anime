import Button from "./Button";

export default function PostCard() {
    return (
        <div className="w-full max-w-[250px] sm:max-w-[275px] lg:max-w-[350px] text-grayLight h-[425px] sm:h-[500px] lg:h-[500px] border border-grayLight pt-4 flex flex-col items-center justify-between">
            <div className="w-[100%] h-fit flex flex-col items-center">
                <div className="w-[90%] h-[200px] sm:h-[225px] lg:h-[225px] border border-grayLight border-b-0 flex items-center justify-center">
                    <p className="text-white font-bold">Image</p>
                </div>
                <div className="h-[45px] flex items-center text-[14px] sm:text-[18px] lg:text-[20px] text-grayLight leading-tight justify-center font-body w-full border border-x-0 border-grayLight">
                    Article
                </div>
            </div>

            <p className="text-center font-display text-[16px] sm:text-[18px] lg:text-[22px] text-grayLight leading-tight px-2 sm:px-4 lg:px-6">
                This is where I bring together my interest for solving puzzles and sharing ideas.
            </p>

            <Button value="Read Post" height="45px" width="100%" size="18px" shadow={false} custom="border-x-0 border-b-0" />
        </div>
    );
}
