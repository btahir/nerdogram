function SideGallery({ header }) {
  return (
    <div>
      <div className="flex items-center justify-center space-x-1">
        <div className="border border-gray-200 w-28"></div>
        <h1 className="text-center py-1 font-semibold">{header}</h1>
        <div className="border border-gray-200 w-28"></div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-4">
        {[1, 2, 3, 4].map((item, index) => (
          <img
            key={index}
            src={`https://res.cloudinary.com/dtubie55e/image/upload/v1617848369/poppy-6147973_1280_cynp0n.jpg`}
            alt="demo"
            className="h-36 w-36 mx-auto"
          />
        ))}
      </div>
    </div>
  )
}

export default SideGallery
