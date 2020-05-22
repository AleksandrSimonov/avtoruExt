// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict'

	const getPicureUrlsScript =
  `(function() {
      let images = document.querySelectorAll('.ImageGalleryDesktop__image.ImageGalleryDesktop__image_hidden');
      let srcArray =
           Array.from(images).map(function(image) {
             return image.currentSrc;
           });
      return srcArray
    })();`;

const getAdDiscriptonScript =
	`(function() {
		let discriptions = document.querySelectorAll('.CardInfo__cell');
		let discriptionsArray =
				 Array.from(discriptions).map(function(discription) {
					 return discription.innerText;
				 });
		return discriptionsArray;
	})();`;

	chrome.tabs.executeScript({code: getPicureUrlsScript}, function(result) {
		var picturesUrlsArray = result[0];
		var discription;
		var sope =this;
		chrome.tabs.executeScript({code: getAdDiscriptonScript}, function(result) {
			sope.discription = result[0];

			let request = {
				"imgUrls": picturesUrlsArray,
				"discriptions": discription
			};
		
			$.ajax({
				type: "POST",
				url: "https://diploma.ru/GetVideoFromAd",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				data: JSON.stringify(request),
				success:  function(response) {
				
						$.each(response,function(Id, obj)
						{
								//show the video
						}
						)
				}
			});

		});
	});