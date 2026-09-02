import type { School } from './types.ts';

/** Target schools. Names and colours are data, not chrome. */
export const schools: School[] = [
  {
    id: 'columbia',
    name: 'Columbia Business School',
    color: '#2b62a8',
    officialUrl: 'https://business.columbia.edu/',
    geography: 'New York City',
  },
  {
    id: 'nyu',
    name: 'NYU Stern',
    color: '#57068c',
    officialUrl: 'https://www.stern.nyu.edu/',
    geography: 'New York City',
  },
  {
    id: 'cornell-tech',
    name: 'Cornell Tech',
    color: '#b31b1b',
    officialUrl: 'https://tech.cornell.edu/',
    geography: 'New York City',
  },
  {
    id: 'yale',
    name: 'Yale SOM',
    color: '#00356b',
    officialUrl: 'https://som.yale.edu/',
    geography: 'New York City, with Yale students joining from New Haven.',
  },
];
