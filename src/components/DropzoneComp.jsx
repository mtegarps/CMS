import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "antd";
import {BsFillCloudUploadFill, BsFillTrash3Fill} from 'react-icons/bs'

const DropzoneComp = ({ className, files, setFiles }) => {
  // const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!files?.length) return

    const formData = new FormData()
    files.forEach(file => formData.append('file', file))
    formData.append('upload_preset', 'friendsbook')

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL
    const data = await fetch(URL, {
      method: 'POST',
      body: formData
    }).then(res => res.json())

    console.log(data)
  }

  return (
    <>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-2 hover:bg-gray-100 p-4 rounded-md border border-gray-300 hover:cursor-pointer'>
          <BsFillCloudUploadFill className='w-5 h-5 fill-current' />
          {/* <ArrowUpTrayIcon className='w-5 h-5 fill-current' /> */}
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-5'>
        {/* Accepted files */}
        <h5 className=''>
          Accepted Files
        </h5>
        <ul
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', listStyle: 'none' }}
          className='mt-3'>
          {files.map(file => (
            <li key={file.name}
              style={{ position: 'relative', marginTop: '1rem'}}
            >
              {/* <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='rounded-md'
              /> */}
              <button
                type='button'
                className='bg-danger text-white px-1 py-1 rounded-sm'
                style={{ border: 'none', borderRadius: '30%', position: 'absolute', top: '-25px', left: '0px' }}
                onClick={() => removeFile(file.name)}
              >
                <BsFillTrash3Fill className='w-5 h-5' />
                {/* <XMarkIcon className='' /> */}
              </button>
              <p className=''>
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        <h5 className=''>
          Rejected Files
        </h5>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', listStyle: 'none' }}>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} style={{ position: 'relative', width: '200px', height: '200px' }}>
              <div>
                <p className=''>
                  {file.name}
                </p>
                <ul className=''>
                  {errors.map(error => (
                    <li className='text-danger' key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                size='sm'
                className='bg-danger text-white px-2 py-1 rounded-md'
                onClick={() => removeRejected(file.name)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className='d-flex gap-4'>
          <Button
            danger
            onClick={removeAll}
            className='mt-1'
            size='sm'
          >
            Remove all files
          </Button>
          {/* <Button
            type='primary'
            className='ml-auto mt-1'
            size='sm'
          >
            Upload to Cloudinary
          </Button> */}
        </div>
      </section>
    </>
  )
}

export default DropzoneComp