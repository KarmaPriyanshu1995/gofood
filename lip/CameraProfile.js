// import ImageCropPicker from 'react-native-image-crop-picker';
// import {Platform, Dimensions} from 'react-native';
// import Helper from './Helper';
// import {
//   check,
//   request,
//   PERMISSIONS,
//   openSettings,
// } from 'react-native-permissions';

// export class CameraProfile {
//   static async open(cb, iscrop) {
//     Helper.cameraAlert(
//       'Select from Camera or Gallery',
//       'Camera',
//       'Gallery',
//       'Cancel',
//       statusCamera => {
//         if (statusCamera) {
//           CameraProfile.checkPremission(
//             PERMISSIONS.ANDROID.CAMERA,
//             PERMISSIONS.IOS.CAMERA,
//             cb,
//             'Camera',
//             iscrop,
//           );
//         }
//       },
//       statusGallery => {
//         if (statusGallery) {
//           CameraProfile.checkPremission(
//             PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
//             PERMISSIONS.IOS.PHOTO_LIBRARY,
//             cb,
//             'Gallery',
//             iscrop,
//           );
//         }
//       },
//     );
//   }

//   static checkPremission = async (
//     androidType,
//     iosType,
//     cb,
//     launchType,
//     iscrop,
//   ) => {
//     await check(
//       Platform.select({
//         android: androidType,
//         ios: iosType,
//       }),
//     ).then(result => {
//       if (result === 'granted') {
//         this.selecteImage(cb, launchType, iscrop);
//         return;
//       }
//       if (result === 'blocked' || result === 'unavailable') {
//         Helper.permissionConfirm(
//           'Access to the camera has been prohibited; please enable it in the Settings app to continue.',
//           status => {
//             if (status) {
//               // openSettings().catch(() => {
//               //     console.warn('cannot open settings')
//               // });
//             }
//           },
//         );
//         return;
//       }
//       request(
//         Platform.select({
//           android: androidType,
//           ios: iosType,
//         }),
//       ).then(status => {
//         if (status === 'granted') {
//           this.selecteImage(cb, launchType, iscrop);
//         } else {
//           console.log('location permission denied');
//         }
//       });
//     });
//   };

//   static selecteImage(cb, launchType, iscrop) {
//     if (launchType == 'Camera') {
//       if (iscrop) {
//         ImageCropPicker.openCamera({
//           width: 400,
//           height: 400,
//           cropping: true,
//           cropperCircleOverlay: true,
//           compressImageMaxWidth: 400,
//           compressImageMaxHeight: 400,
//           freeStyleCropEnabled: true,
//         }).then(image => {
//           cb(image);
//         });

//         // ImageCropPicker.openCamera({
//         //     // mediaType: media,
//         //     loadingLabelText: 'Uploading, please wait...',
//         //   }).then((response) => {
//         //     ImageCropPicker.openCropper({
//         //       path: response?.path,
//         //       width: response?.width,
//         //       height: response?.height,
//         //     })
//         //       .then((resCrop) => {
//         //         cb(resCrop);
//         //       })
//         //       .catch((e) => {
//         //         if (e.message == "Cannot find image data") {
//         //             console.log("------errorCamera:eeeee ", e)
//         //         }
//         //       });
//         //   });
//       } else {
//         ImageCropPicker.openCamera({
//           cropping: true,
//           cropperCircleOverlay: true,
//           compressImageMaxWidth: 400,
//           compressImageMaxHeight: 400,
//           freeStyleCropEnabled: true,
//         }).then(image => {
//           cb(image);
//         });

//         // ImageCropPicker.openCamera({
//         //     // mediaType: media,
//         //     loadingLabelText: 'Uploading, please wait...',
//         //   }).then((response) => {
//         //     ImageCropPicker.openCropper({
//         //       path: response?.path,
//         //       width: response?.width,
//         //       height: response?.height,
//         //     })
//         //       .then((resCrop) => {
//         //         cb(resCrop);
//         //       })
//         //       .catch((e) => {
//         //         if (e.message == "Cannot find image data") {
//         //             console.log("------errorCamera:eeeee ", e)
//         //         }
//         //       });
//         //   });
//       }
//     }
//     if (launchType == 'Gallery') {
//       if (iscrop) {
//         // ImageCropPicker.openPicker({
//         //     width: 400,
//         //     height: 400,
//         //     cropping: true,
//         //     cropperCircleOverlay: true,
//         //     compressImageMaxWidth: 400,
//         //     compressImageMaxHeight: 400,
//         //     freeStyleCropEnabled: true,
//         // }).then(image => {
//         //     cb(image);
//         // });
//         ImageCropPicker.openPicker({
//           loadingLabelText: 'Uploading, please wait...',
//         }).then(response => {
//           cb(response);
//           // ImageCropPicker.openCropper({
//           //   path: response?.path,
//           //   width: response?.width,
//           //   height: response?.height,
//           // })
//           //   .then((resCrop) => {
//           //     cb(resCrop);
//           //   })
//           //   .catch((e) => {
//           //     if (e.message == "Cannot find image data") {
//           //         console.log("------errorCamera:eeeee ", e)
//           //     }
//           //   });
//         });
//       } else {
//         // ImageCropPicker.openPicker({
//         //     cropping: true,
//         //     cropperCircleOverlay: true,
//         //     compressImageMaxWidth: 400,
//         //     compressImageMaxHeight: 400,
//         //     freeStyleCropEnabled: true,
//         // }).then(image => {
//         //     cb(image);
//         // });
//         ImageCropPicker.openPicker({
//           loadingLabelText: 'Uploading, please wait...',
//         }).then(response => {
//           cb(response);
//           // ImageCropPicker.openCropper({
//           //   path: response?.path,
//           //   width: response?.width,
//           //   height: response?.height,
//           // })
//           //   .then((resCrop) => {
//           //     cb(resCrop);
//           //   })
//           //   .catch((e) => {
//           //     if (e.message == "Cannot find image data") {
//           //         console.log("------errorCamera:eeeee ", e)
//           //     }
//           //   });
//         });
//       }
//     }
//   }
// }
