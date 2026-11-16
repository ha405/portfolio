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
  { name: 'Multi-Agent ML Platform', category: 'Applied AI', description: 'A full-stack platform that runs data analysis and model-training workflows from uploaded datasets and natural-language goals.', stack: 'Python · Flask · React · Docker', url: 'https://github.com/ha405/AutoML' },
  { name: 'Autonomous Development Agent', category: 'AI developer tools', description: 'Agents that turn prompts and Figma designs into full-stack code, REST APIs, and deployment configuration.', stack: 'TypeScript · Google ADK · MCP', url: 'https://github.com/ha405/FullStackAgent' },
  { name: 'Diffusion transformer quantization', category: 'Model compression', description: 'Post-training quantization using 4-bit weights and 8-bit activations. Adjusts scaling across diffusion timesteps and calibrates individual transformer blocks.', stack: 'PyTorch · Diffusers · W4A8', url: 'https://github.com/ha405/AI624-Diffusion_Quantization' },
  { name: 'Semantic Code Search', category: 'Developer tools', description: 'A GitHub MCP server for repository search and code retrieval, with a natural-language interface for investigating bugs.', stack: 'Node.js · JSON-RPC · MCP', url: 'https://github.com/ha405/Model-Context-Protocol' },
  { name: 'Urdu news classification', category: 'Natural language processing', description: 'A comparison of classical and neural classifiers for Urdu news, with text normalization and diacritic removal before training.', stack: 'UrduHack · scikit-learn · PyTorch', url: 'https://github.com/ha405/Urdu-News-Classification-with-ML' },
];

export const mlWork = [
  { metric: '40% less memory', title: 'Production inference', description: 'Optimized model execution with ONNX and TensorRT, then deployed and stress-tested cloud inference services.', detail: 'Innova Tech · ONNX · TensorRT' },
  { metric: 'LoRA', title: 'Fine-tuning and evaluation', description: 'Fine-tuned LLMs across multiple domains and analyzed how attention heads contributed to changes in generated responses.', detail: 'LUMS · PyTorch · Transformers' },
  { metric: 'Up to 99% compression', title: 'Model efficiency', description: 'Aligned compressed ViTs and LLMs with reference checkpoints while preserving baseline performance; also developed 4-bit diffusion quantization.', detail: 'LUMS · Pruning · Quantization' },
  { metric: 'Jetson Nano', title: 'Edge inference', description: 'Quantized LLMs with GPTQ and deployed TensorRT-optimized inference for constrained edge hardware.', detail: 'LUMS · GPTQ · TensorRT' },
];

export const experience = [
  { company: 'NEXA · UK, remote', role: 'Founding Product Engineer', period: 'May — Nov 2026', description: 'Shipped a production AI copilot with typed agent tools and streamed responses. Built queue-backed CV processing, interview scheduling, and candidate sourcing workflows. Defined an agent-assisted development framework for the engineering team.' },
  { company: 'DuneScout · UAE, remote', role: 'Founding Software Engineer', period: 'Mar — May 2026', description: 'Built web scrapers, an asynchronous data ingestion pipeline, backend APIs, and a frontend analytics dashboard.' },
  { company: 'DatacurveAI · YC S24', role: 'Open Source Software Engineer', period: 'Nov 2025 — Mar 2026', description: 'Implemented features in open-source ML repositories and authored coding tasks for training and evaluating code-generation models.' },
  { company: 'Innova Tech', role: 'Machine Learning Engineer', period: 'Jan — Oct 2025', description: 'Improved production classifier accuracy by 4% through preprocessing and annotation. Optimized inference with ONNX and TensorRT, cutting memory use by 40%; deployed, profiled, and stress-tested cloud model services.' },
  { company: 'University of Illinois Urbana-Champaign', role: 'AI Research Engineer', period: 'May — Aug 2025', description: 'Built AI-assisted tooling to exclude selected legacy C code at compile time and an LLM agent for large C-to-Rust codebase migrations.' },
  { company: 'LUMS · CITY Lab and Computer Vision Lab', role: 'ML Research Engineer', period: 'Jan 2025 — May 2026', description: 'Compressed ViTs and LLMs while preserving baseline performance at up to 99% compression. Developed 4-bit diffusion quantization, LoRA fine-tuning studies, and GPTQ-based edge inference on Jetson Nano.' },
];

export const expertise = [
  { title: 'Product engineering', description: 'Build user-facing applications, backend APIs, and the systems that connect them.' },
  { title: 'Applied AI', description: 'Integrate agent tools, retrieval, and streaming interfaces into real product workflows.' },
  { title: 'ML deployment', description: 'Fine-tune and optimize models, then evaluate inference against accuracy, memory, and latency requirements.' },
];
