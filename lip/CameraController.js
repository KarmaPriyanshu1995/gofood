// import ImageCropPicker from 'react-native-image-crop-picker';
// import {Alert, Platform} from 'react-native';
// import {
//   check,
//   request,
//   PERMISSIONS,
//   openSettings,
// } from 'react-native-permissions';
// import Helper from './Helper';

// export default class CameraController {
//   static async open(fileType, cb, iscrop) {
//     if (fileType === 'both') {
//       Helper.cameraAlert(
//         'Select from Camera or Gallery',
//         'Image',
//         'Video',
//         'Cancel',
//         statusImage => {
//           if (statusImage) {
//             this.mediaConfirmPermission(cb, iscrop, 'photo');
//           }
//         },
//         statusVideo => {
//           if (statusVideo) {
//             this.mediaConfirmPermission(cb, iscrop, 'video');
//           }
//         },
//       );
//     } else {
//       this.mediaConfirmPermission(cb, iscrop, 'photo');
//     }
//   }

//   static mediaConfirmPermission = (cb, iscrop, media) => {
//     Helper.cameraAlert(
//       'Select from Camera or Gallery',
//       'Camera',
//       'Gallery',
//       'Cancel',
//       statusCamera => {
//         if (statusCamera) {
//           CameraController.checkPremission(
//             PERMISSIONS.ANDROID.CAMERA,
//             PERMISSIONS.IOS.CAMERA,
//             cb,
//             'Camera',
//             media,
//             iscrop,
//           );
//         }
//       },
//       statusGallery => {
//         if (statusGallery) {
//           CameraController.checkPremission(
//             PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
//             PERMISSIONS.IOS.PHOTO_LIBRARY,
//             cb,
//             'Gallery',
//             media,
//             iscrop,
//           );
//         }
//       },
//     );
//   };

//   static checkPremission = async (
//     androidType,
//     iosType,
//     cb,
//     launchType,
//     media,
//     iscrop,
//   ) => {
//     await check(
//       Platform.select({
//         android: androidType,
//         ios: iosType,
//       }),
//     ).then(result => {
//       if (result === 'granted') {
//         this.selecteImage(cb, launchType, media, iscrop);
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
//           console.log('You can use the location');
//           this.selecteImage(cb, launchType, media, iscrop);
//         } else if (status === 'limited') {
//           console.log('You can use the location');
//           this.selecteImage(cb, launchType, media, iscrop);
//         } else {
//           console.log('location permission denied');
//         }
//       });
//     });
//   };

//   static selecteImage(cb, launchType, media, iscrop) {
//    try {
//     if (launchType == 'Camera') {
//         if (iscrop) {
//           ImageCropPicker.openCamera({
//             mediaType: media,
//             loadingLabelText: 'Uploading, please wait...',
//             cropping: true,
//             cropperCircleOverlay: true,
//             compressImageMaxWidth: 400,
//             compressImageMaxHeight: 400,
//             freeStyleCropEnabled: true,
//           }).then(response => {
//             cb(response);
//             // ImageCropPicker.openCropper({
//             //   path: response?.path,
//             //   width: 400,
//             //   height: 400
//             // //  width: response?.width,
//             //  // height: response?.height,
//             // })
//             //   .then(resCrop => {
//             //     cb(resCrop);
//             //   })
//             //   .catch(e => {
//             //     if (e.message == 'Cannot find image data') {
//             //       console.log('------ iscrop errorCamera ', e);
//             //     }
//             //   });
//           });
//         } else if (media == 'video') {
//           ImageCropPicker.openCamera({
//             mediaType: 'video',
//             loadingLabelText: 'Uploading, please wait...',
//           })
//             .then(response => {
//               cb(response);
//             })
//             .catch(error => {
//               console.log('error video camera', error);
//             });
//         } else {
//           ImageCropPicker.openCamera({
//             mediaType: media,
//             loadingLabelText: 'Uploading, please wait...',
//             cropping: true,
//             cropperCircleOverlay: true,
//             compressImageMaxWidth: 400,
//             compressImageMaxHeight: 400,
//             freeStyleCropEnabled: true,
//           }).then(response => {
//             cb(response);
//             // ImageCropPicker.openCropper({
//             //   path: response?.path,
//             //   width: 400,
//             //   height: 400
//             // })
//             //   .then(resCrop => {
//             //     cb(resCrop);
//             //   })
//             //   .catch(e => {
//             //     if (e.message == 'Cannot find image data') {
//             //       console.log('------errorCamera:eeeee ', e);
//             //     }
//             //   });
//           });
//         }
//       } else {
//         if (iscrop) {
//           ImageCropPicker.openPicker({
//             mediaType: media,
//             loadingLabelText: 'Uploading, please wait...',
//             cropping: true,
//             cropperCircleOverlay: true,
//             compressImageMaxWidth: 400,
//             compressImageMaxHeight: 400,
//             freeStyleCropEnabled: true,
//           }).then(response => {
//             cb(response);
//             // ImageCropPicker.openCropper({
//             //   path: response?.path,
//             //   width: 400,
//             //   height: 400
//             // })
//             //   .then(resCrop => {
//             //     cb(resCrop);
//             //   })
//             //   .catch(e => {
//             //     if (e.message == 'Cannot find image data') {
//             //       console.log('------iscrop Gallery', e);
//             //     }
//             //   });
//           });
//         } else if (media == 'video') {
//           ImageCropPicker.openPicker({
//             mediaType: 'video',
//             loadingLabelText: 'Uploading, please wait...',
//           })
//             .then(response => {
//               cb(response);
//             })
//             .catch(error => {
//               console.log('error video gallery', error);
//             });
//         } else {
//           ImageCropPicker.openPicker({
//             mediaType: media,
//             loadingLabelText: 'Uploading, please wait...',
//             cropping: true,
//             cropperCircleOverlay: true,
//             compressImageMaxWidth: 400,
//             compressImageMaxHeight: 400,
//             freeStyleCropEnabled: true,
//           }).then(response => {
//               cb(response);
//             // ImageCropPicker.openCropper({
//             //   path: response?.path,
//             //   width: 400,
//             //   height: 400
//             // })
//             //   .then(resCrop => {
                
//             //   })
//             //   .catch(e => {
//             //     if (e.message == 'Cannot find image data') {
//             //       console.log('------GalleryError', e);
//             //     }
//             //   });
//           });
//         }
//       }
//    } catch (error) {
//     console.log('------errorerror trycatch', error);
//    }
//   }
// }
