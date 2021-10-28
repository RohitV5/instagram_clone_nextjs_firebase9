function Story({img, username}) {
    return (
        <div>
            <img className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer transition duration-200 ease-out transform hover:scale-110" src={img} alt=""></img>
            <p className="text-xs text-center truncate w-14">{username}</p>
        </div>

    )
}

export default Story
