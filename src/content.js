// Experimental measurements retained from the existing portfolio records.
export const studies = [
  {
    id: 'pruning', tag: 'Structured pruning', title: 'Reducing model size and latency with structured pruning',
    summary: 'Removed entire channels from an image classifier, then retrained the smaller network to recover accuracy.',
    result: '81% smaller · 40% lower latency',
    approach: 'Structured pruning removes whole channels of learned features, reducing the work performed by each layer. I measured the original classifier, pruned it, retrained the smaller network, and measured size, latency, and accuracy again.',
    columns: ['Model', 'Size', 'Latency', 'Accuracy'],
    rows: [['Original', '58.25 MB', '13.82 ms', '93.6%'], ['Pruned and retrained', '11.14 MB', '8.34 ms', '88.0%']],
    finding: 'The retrained network reduced stored size from 58.25 MB to 11.14 MB and recorded inference time from 13.82 ms to 8.34 ms. It reached 88.0% accuracy on CIFAR-10. Retraining was a key part of producing a useful compact model.',
    decision: 'The result is a practical starting point when a classifier needs a smaller footprint and quicker responses. The next step for a real deployment is to select the accuracy target and benchmark the exported model on its intended hardware.',
    technicalNote: 'Removing whole channels changes layer dimensions, so standard dense convolution kernels have less computation to perform. This is different from removing isolated weights, which may not speed up an ordinary runtime.',
    nextStep: 'Evaluate several pruning levels and choose the smallest model that meets the application’s accuracy target. Benchmark the candidates on the target device.',
    limit: 'VGG-16 on CIFAR-10; size, latency, and accuracy are from this experiment. Target-device performance needs a separate benchmark.',
    repo: 'https://github.com/ha405/Pruning',
  },
  {
    id: 'quantization', tag: 'Model quantization', title: 'A four-times-smaller model at the same accuracy',
    summary: 'Used lower-precision weights to reduce the classifier’s stored size while preserving its measured accuracy.',
    result: '75% smaller · 93.6% accuracy retained',
    approach: 'Quantization stores model weights using fewer bits per value. I tested fixed-scale and adaptive methods at light and heavy settings, with a short retraining pass, then compared each version with the original model.',
    columns: ['Configuration', 'Stored size', 'Accuracy'],
    rows: [['Original', '58.25 MB', '93.6%'], ['Fixed-scale, light', '14.57 MB', '93.6%']],
    finding: 'The selected configuration reduced stored model size from 58.25 MB to 14.57 MB while maintaining 93.6% accuracy. This isolates a useful storage benefit without assuming that lower precision also improves serving speed.',
    decision: 'A model this much smaller is easier to store and distribute when package size is a constraint. For an inference deployment, the exported model should also be tested with the lower-precision kernels available on the target hardware.',
    technicalNote: 'Quantization changes how weights are represented. Runtime performance depends on whether the deployment backend has efficient operations for that representation.',
    nextStep: 'Export the accuracy-preserving configuration and benchmark latency and peak memory with the intended runtime and hardware.',
    limit: 'The selected results show stored size and accuracy. They do not establish an inference-speed improvement.',
    repo: 'https://github.com/ha405/Quantization',
  },
  {
    id: 'distillation', tag: 'Knowledge distillation', title: 'Training a compact classifier with teacher guidance',
    summary: 'Compared student-training approaches using a larger classifier as a source of predictions and internal features.',
    result: '9.2M-parameter student · 73% fewer parameters',
    approach: 'Knowledge distillation uses a larger “teacher” model to guide a smaller “student” during training. I compared a student trained alone, one trained on the teacher’s predictions, a smaller model trained on its internal features, and a group of specialist models.',
    columns: ['Configuration', 'Parameters', 'Accuracy'],
    rows: [['Teacher', '33.6M', '73.5%'], ['Feature-guided student', '9.2M', '56.8%']],
    finding: 'The feature-guided student used 9.2M parameters—about 73% fewer than the 33.6M-parameter teacher—and reached 56.8% accuracy. The experiment produced a substantially smaller model and a concrete basis for further student-model evaluation.',
    decision: 'This gives a compact candidate for applications where model capacity matters. Its suitability depends on the required accuracy and measured performance on the target device.',
    technicalNote: 'Prediction guidance uses the teacher’s final outputs; feature guidance uses information from intermediate layers. The student architectures differed in this experiment, so a same-architecture comparison is the next step for measuring the effect of each training method.',
    nextStep: 'Train the same student architecture with and without teacher guidance, then measure accuracy, latency, and memory on the target device.',
    limit: 'This exploratory study compares different student architectures. The parameter count is measured; serving latency and memory would be evaluated separately.',
    repo: 'https://github.com/ha405/Knowledge-Distillation',
  },
];

export const projects = [
  { name: 'Code search with MCP', category: 'Developer tools', description: 'An MCP server that lets language models search a repository and retrieve relevant code. Includes documentation generation with Gemini.', stack: 'Node.js · JSON-RPC · MCP · Gemini', url: 'https://github.com/ha405/Model-Context-Protocol' },
  { name: 'FullStackAgent', category: 'AI agents', description: 'Frontend and backend agents that share a workspace to build web applications. Supports project scaffolding, Figma designs, and parallel tasks.', stack: 'TypeScript · Google ADK · Figma MCP', url: 'https://github.com/ha405/FullStackAgent' },
  { name: 'Diffusion transformer quantization', category: 'Model compression', description: 'Post-training quantization using 4-bit weights and 8-bit activations. Adjusts scaling across diffusion timesteps and calibrates individual transformer blocks.', stack: 'PyTorch · Diffusers · W4A8', url: 'https://github.com/ha405/AI624-Diffusion_Quantization' },
  { name: 'AutoML agents', category: 'ML tools', description: 'Agents for planning experiments, training models, and plotting results. Model training runs in Docker containers.', stack: 'Python · Flask · React · Docker', url: 'https://github.com/ha405/AutoML' },
  { name: 'Urdu news classification', category: 'Natural language processing', description: 'A comparison of classical and neural classifiers for Urdu news, with text normalization and diacritic removal before training.', stack: 'UrduHack · scikit-learn · PyTorch', url: 'https://github.com/ha405/Urdu-News-Classification-with-ML' },
];

export const experience = [
  { company: 'NEXA', role: 'Founding Software Engineer · Team Lead', period: 'May 2026 — present', description: 'Lead product engineering across backend architecture, frontend development, and AI integration.' },
  { company: 'LUMS / UIUC', role: 'Research Engineer', period: 'Jan 2025 — present', description: 'Research model pruning, diffusion model quantization, and federated learning when data distributions differ across clients.' },
  { company: 'DatacurveAI', role: 'OSS Engineer', period: 'Dec 2025 — Mar 2026', description: 'Contributed features and fixes to open-source ML repositories and filtered training data for coding tasks.' },
  { company: 'Innova Tech', role: 'Machine Learning Engineer', period: 'Jul — Oct 2025', description: 'Worked on INT8 quantization of SmolVLM with ONNX and TensorRT, CNN training, and automated annotation pipelines.' },
];

export const expertise = [
  { title: 'Web applications', description: 'Build frontend interfaces, backend APIs, and internal tools, or add features to an existing application.' },
  { title: 'AI integration', description: 'Add document search, code retrieval, or model tools to an application, with evaluation suited to the task.' },
  { title: 'Model optimization', description: 'Evaluate pruning, quantization, and distillation against your accuracy, latency, and memory requirements.' },
];
