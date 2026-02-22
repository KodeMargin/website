export default function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center min-h-[60vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/loading.gif"
                alt="Loading KodeMargin..."
                className="max-w-25 md:max-w-30 h-auto object-contain opacity-90"
            />
        </div>
    );
}
