import { useState, useRef } from 'react'
import SEO from '@/components/SEO'
import PageHeader from '@/components/PageHeader'
import ImageUploader from '@/components/ImageUploader'
import { useRouter } from 'next/router'

function CreatePage() {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState('')
  const [repository, setRepository] = useState('')
  const [description, setDescription] = useState('Say something...')
  const pageTitle = `Create | ${process.env.siteTitle}`

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const body = {
        imageUrl,
        repository,
        description
      }
      await fetch('/api/create-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="mt-12 pt-4 pb-12 min-h-screen">
      <SEO title={pageTitle} />
      <PageHeader text="Create Post" />
      <form className="w-full px-4 py-12 mx-auto max-w-2xl" onSubmit={handleSubmit}>
        <ImageUploader setImageUrl={setImageUrl} />

        <label
          className="block mb-2 text-xs font-bold uppercase text-gray-900"
          htmlFor="github-repo"
        >
          Github Repository
        </label>

        <input
          className="w-full mb-6 form-input border border-gray-200 rounded p-2"
          id="github-repo"
          placeholder="https://github.com/btahir/next-shopify-starter"
          type="text"
          required
          onChange={(e) => setRepository(e.target.value)}
        />

        <label
          className="block mb-2 text-xs font-bold uppercase text-gray-900"
          htmlFor="description"
        >
          Description
        </label>

        <textarea
          className="w-full mb-6 form-textarea border border-gray-200 rounded p-2"
          id="description"
          placeholder="Say something..."
          rows="8"
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className="px-4 py-2 text-lg font-medium text-white bg-palette-primary rounded hover:border-palette-dark hover:bg-palette-dark">
          Post
        </button>
      </form>
    </section>
  )
}

export default CreatePage
