import SanityClient  from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";


export const client = SanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-11-22',
    useCdn: true,
    token: process.env.REACT__APP_SANITY_TOKEN
})

const builder = imageUrlBuilder(client);


export const urlFor = (source: SanityImageSource | string) => builder.image(source);