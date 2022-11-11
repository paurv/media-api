import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dmxb1jeg1',
      api_key: '435627363121823',
      api_secret: 'dZ74Y7h2nDxZPdDTOBwbSxSeHcY',
    });
  },
};
