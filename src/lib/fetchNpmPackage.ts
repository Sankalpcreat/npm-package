
import axios from 'axios';

export async function fetchNpmPackage(pkg: string) {
  const { data } = await axios.get(`https://registry.npmjs.org/${pkg}`);
  return {
    name: data.name,
    version: data['dist-tags'].latest,
    description: data.description,
    homepage: data.homepage,
  };
}
