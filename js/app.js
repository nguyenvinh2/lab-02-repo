'use strict';

function Horn(hornObject) {
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.image = hornObject.image_url;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;
}

function HornCollection() {
  this.hornList = [];

  this.getHorns = () => {
    $.get('data/page-1.json', 'json')
      .then(data => {
        data.forEach(animal => {
          this.hornList.push(new Horn(animal));
        });
        this.renderHorns();
      });
  };

  this.renderHorns = () => {
    this.hornList.forEach(horn => {
      // const $imgDiv = $(`<div id=${horn.title} class="images" style="background-image: url('${horn.image}')"></div>`);
      const $imgDiv = $(`<div id=${horn.title}"></div>`);
      $imgDiv.attr('id', horn.title);
      const $img = $('<img/>');
      $img.attr('src', horn.image);
      $img.appendTo($imgDiv);
      $imgDiv.appendTo($('#horns'));
    });

  };
}

const Horns = new HornCollection();

Horns.getHorns();

console.log(Horns.hornList);


