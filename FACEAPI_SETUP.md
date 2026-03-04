# Face-api.js Models Setup Guide

## Default Models Location

Face-api.js requires pre-trained models to detect and recognize faces. The models must be placed in the frontend's public directory.

## Models Required

1. `tiny_face_detector_model-weights_manifest.json` + weights files
2. `face_landmark_68_model-weights_manifest.json` + weights files  
3. `face_recognition_model-weights_manifest.json` + weights files
4. `face_expression_model-weights_manifest.json` + weights files

## Installation Steps

### Option 1: Automatic Download (Recommended)

Place this script in a file called `download-models.js` in the project root:

```javascript
const https = require('https');
const fs = require('fs');
const path = require('path');

const modelsUrl = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
const modelsDir = path.join(__dirname, 'frontend/public/models');

// Create models directory if it doesn't exist
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const models = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-weights_0.bin',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-weights_0.bin',
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model-weights_0.bin',
  'face_expression_model-weights_manifest.json',
  'face_expression_model-weights_0.bin'
];

async function downloadModel(filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(modelsDir, filename));
    https.get(modelsUrl + filename, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(modelsDir, filename));
      reject(err);
    });
  });
}

async function downloadAllModels() {
  console.log('📥 Downloading Face-api.js models...');
  try {
    for (const model of models) {
      await downloadModel(model);
    }
    console.log('✅ All models downloaded successfully!');
  } catch (error) {
    console.error('❌ Error downloading models:', error);
    process.exit(1);
  }
}

downloadAllModels();
```

Run the script:
```bash
node download-models.js
```

### Option 2: Manual Download

1. Visit: https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/
2. Download each `.bin` and `_manifest.json` file
3. Place them in `frontend/public/models/` directory

### Option 3: Using npm Package

```bash
cd frontend

# Install face-api models package (if available)
npm install @vladmandic/face-api

# Copy models to public directory
mkdir -p public/models
cp node_modules/@vladmandic/face-api/model/* public/models/
```

## Verify Installation

Check that `frontend/public/models/` contains:

```
models/
├── tiny_face_detector_model-weights_manifest.json
├── tiny_face_detector_model-weights_0.bin
├── face_landmark_68_model-weights_manifest.json
├── face_landmark_68_model-weights_0.bin
├── face_recognition_model-weights_manifest.json
├── face_recognition_model-weights_0.bin
├── face_expression_model-weights_manifest.json
└── face_expression_model-weights_0.bin
```

## Model Information

### Tiny Face Detector
- Size: ~190 KB
- Speed: Very fast (best for real-time)
- Accuracy: Good for most use cases

### Face Landmark Detection
- Size: ~350 KB
- Detects 68 facial landmarks

### Face Recognition
- Size: ~170 MB
- Generates 128-dimensional facial embeddings
- Used for face matching

### Face Expression
- Size: ~600 KB
- Detects emotions: neutral, happy, sad, angry, fearful, disgusted, surprised

## Loading Models in Code

The FacialRecognition component loads models from:
```javascript
const MODEL_URL = process.env.PUBLIC_URL + "/models";
```

This resolves to `public/models/` directory.

## Troubleshooting

### Models Not Found Error
- Verify models are in `frontend/public/models/`
- Check file names match exactly (case-sensitive)
- Clear browser cache and reload

### "Cannot read property 'load' of undefined"
- Ensure all required model files are present
- Check browser console for 404 errors
- Verify correct model URL path

### Memory Issues
- Face recognition model is large (~170 MB)
- Load models only when needed
- Unload after use if memory is critical

### Slow Loading
- Models load on first use (~1-2 seconds)
- Consider pre-loading on page load for better UX
- Use service workers for caching

## Performance Tips

1. **Pre-load in background:** Start loading models early
2. **Compress:** Use gzip compression for model files
3. **Cache:** Browser will cache model files automatically
4. **CDN:** Serve models from CDN for faster delivery

## References

- Face-api.js: https://github.com/vladmandic/face-api
- TensorFlow.js: https://www.tensorflow.org/js
- Model Details: https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/
