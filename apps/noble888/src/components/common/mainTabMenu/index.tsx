'use client'
import Link from 'next/link'
import { useState } from 'react'

const Index = () => {
  const tagsData = [
    { link: '/today', name: 'Today' },
    { link: '/yesterday', name: 'Yesterday' },
  ]

  const [currentTagIndex, setCurrentTagIndex] = useState<number>(0)

  return (
    <div className="flex h-10">
      {tagsData.map((tag, index) => {
        const activeClass =
          index === currentTagIndex
            ? 'bg-blue-300 text-white'
            : 'bg-gray-100 text-blue-900 hover:bg-blue-200'

        return (
          <Link
            className={`flex-1 flex items-center justify-center cursor-pointer ${activeClass}`}
            href="/statement"
            key={tag.link}
            onClick={() => setCurrentTagIndex(index)}
          >
            {tag.name}
          </Link>
        )
      })}
    </div>
  )
}

export default Index
