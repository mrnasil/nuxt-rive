import { defineEventHandler, getQuery, createError } from 'h3'
import { readFile, stat } from 'node:fs/promises'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const path = query.path as string

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Path is required',
    })
  }

  // Basic security check: ensure we are reading a .riv file
  if (!path.endsWith('.riv')) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied: Only .riv files are allowed',
    })
  }

  try {
    // Verify file exists
    await stat(path)

    // Read and return file
    const file = await readFile(path)

    // Set proper content type
    event.node.res.setHeader('Content-Type', 'application/octet-stream')
    return file
  }
  catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found',
      cause: error,
    })
  }
})
