// Credit: https://github.com/andreaskeller/react-cloudinary
import { useEffect, useRef, useState } from 'react'

function ImageUploader({ setImageUrl }) {
  const dropbox = useRef(null)
  const fileSelect = useRef(null)
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)

  async function handleImageUpload() {
    if (fileSelect) {
      fileSelect.current.click()
    }
  }

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      uploadFile(files[i])
    }
  }

  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener('progress', (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total))
    })

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText)

        setImage(response.secure_url)
        setImageUrl(response.secure_url)
      }
    }

    fd.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET
    )
    fd.append('tags', 'browser_upload')
    fd.append('file', file)
    xhr.send(fd)
  }

  useEffect(() => {
    function dragEnter(e) {
      e.stopPropagation()
      e.preventDefault()
    }

    function dragOver(e) {
      e.stopPropagation()
      e.preventDefault()
    }

    function drop(e) {
      e.stopPropagation()
      e.preventDefault()

      const dt = e.dataTransfer
      const files = dt.files

      handleFiles(files)
    }

    dropbox.current.addEventListener('dragenter', dragEnter, false)
    dropbox.current.addEventListener('dragover', dragOver, false)
    dropbox.current.addEventListener('drop', drop, false)

    return () => {
      try {
        dropbox.current.removeEventListener('dragenter', dragEnter)
        dropbox.current.removeEventListener('dragover', dragOver)
        dropbox.current.removeEventListener('drop', drop)
      } catch(err) {
        console.log('listener error', err)
      }
    }
  }, [])

  return (
    <div className="mb-4 sm:mb-8 h-72 sm:h-96 w-full mx-auto" ref={dropbox}>
      {image ? (
        <img
          className="rounded-lg w-full h-full"
          src={image.replace('upload/', 'upload/w_600/')}
        />
      ) : (
        <div
          className="bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg h-full w-full"
        >
          <div className="flex justify-center items-center h-full">
            {progress === 0 ? (
              <div className="text-gray-700 text-center">
                <div>Drag and Drop assets here</div>
                <div className="my-2">or</div>
                <button
                  className="bg-palette-primary hover:bg-palette-dark text-white font-bold px-4 py-2 rounded block m-auto"
                  onClick={handleImageUpload}
                  type="button"
                >
                  Browse
                </button>
              </div>
            ) : (
              <span className="text-gray-700">{progress}%</span>
            )}

            <input
              ref={fileSelect}
              type='file'
              accept='image/*'
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader
