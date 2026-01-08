
import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const config = buildConfig({
  editor: lexicalEditor(),
  collections: [
    {
      slug: 'users',
      auth: true,
      access: {
        delete: () => false,
        update: () => false,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'roles',
          type: 'select',
          hasMany: true,
          options: [
            {
              label: 'Admin',
              value: 'admin',
            },
            {
              label: 'Editor',
              value: 'editor',
            },
          ],
          defaultValue: ['editor'],
        }
      ],
    },
    {
      slug: 'blog-posts',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
            { label: 'Rejected', value: 'rejected' },
          ],
          defaultValue: 'draft',
        },
      ],
    },
    {
      slug: 'categories',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://127.0.0.1/refine-project',
  }),
  sharp,
});

export default config;