import * as yup from "yup";

export const tvFormSchema = yup.object().shape({
  name: yup.string().required("Please Fill in the Field!"),
  brand: yup.string().required("Please Fill in the Field!"),
  year: yup.number().required("Please Fill in the Field!"),
  type: yup.string().required("Please Fill in the Field!"),
  resolution: yup.string().required("Please Fill in the Field!"),
});

export const computerFormSchema = yup.object().shape({
  name: yup.string().required("Please Fill in the Field!"),
  brand: yup.string().required("Please Fill in the Field!"),
  type: yup.string().required("Please Fill in the Field!"),
  processor: yup.string().required("Please Fill in the Field!"),
  os: yup.string().required("Please Fill in the Field!"),
  graphics: yup.string().required("Please Fill in the Field!"),
  screen: yup.string().required("Please Fill in the Field!"),
  ram: yup.number().required("Please Fill in the Field!"),
  name: yup.string().required("Please Fill in the Field!"),
  storagetype: yup.string().required("Please Fill in the Field!"),
  size: yup.number().required("Please Fill in the Field!"),
  camera: yup.string().required("Please Fill in the Field!"),
  weight: yup.string().required("Please Fill in the Field!"),
  price: yup.number().required("Please Fill in the Field!"),
});

export const cellFormSchema = yup.object().shape({
  name: yup.string().required("Please Fill in the Field!"),
  brand: yup.string().required("Please Fill in the Field!"),
  year: yup.number().required("Please Fill in the Field!"),
  network: yup.string().required("Please Fill in the Field!"),
  dimensions: yup.string().required("Please Fill in the Field!"),
  weight: yup.string().required("Please Fill in the Field!"),
  sim: yup.string().required("Please Fill in the Field!"),
  displayType: yup.string().required("Please Fill in the Field!"),
  displaySize: yup.number().required("Please Fill in the Field!"),
  resolution: yup.string().required("Please Fill in the Field!"),
  protection: yup.string().required("Please Fill in the Field!"),
  os: yup.string().required("Please Fill in the Field!"),
  chipset: yup.string().required("Please Fill in the Field!"),
  cpu: yup.string().required("Please Fill in the Field!"),
  gpu: yup.string().required("Please Fill in the Field!"),
  cardSlot: yup.string().required("Please Fill in the Field!"),
  internalMemory: yup.number().required("Please Fill in the Field!"),
  ram: yup.number().required("Please Fill in the Field!"),
  mainCameraFeatures: yup.string().required("Please Fill in the Field!"),
  mainCameraVideo: yup.string().required("Please Fill in the Field!"),
  selfieCameraFeatures: yup.string().required("Please Fill in the Field!"),
  selfieCameraVideo: yup.string().required("Please Fill in the Field!"),
  battery: yup.string().required("Please Fill in the Field!"),
  price: yup.number().required("Please Fill in the Field!"),
});

export const accessoryFormSchema = yup.object().shape({
  name: yup.string().required("Please Fill in the Field!"),
  brand: yup.string().required("Please Fill in the Field!"),
  category: yup.string().required("Please Fill in the Field!"),
  price: yup.number().required("Please Fill in the Field!"),
  description: yup.string().required("Please Fill in the Field!"),
});
