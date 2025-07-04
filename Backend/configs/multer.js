// import multer from 'multer';

// export const upload = multer({storage: multer.diskStorage({})})


import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export { upload };