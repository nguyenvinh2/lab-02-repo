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
  this.keywords = [];

  this.getHorns = () => {
    $.get('data/page-1.json', 'json')
      .then(data => {
        data.forEach(animal => {
          this.hornList.push(new Horn(animal));
          if (!this.keywords.includes(animal.keyword)) {
            this.keywords.push(animal.keyword);
          }
        });
        this.renderHorns();
        this.renderfilterHorns();
        filterHorn();
      });
  };

  this.renderHorns = () => {
    $('#horns').empty();
    this.hornList.forEach(horn => {
      const $imgDiv = $(`<div class="image ${horn.keyword}"></div>`);
      const $img = $('<img/>');
      const $title = $(`<h2>${horn.title.toUpperCase()}</h2>`);
      $title.appendTo($imgDiv);
      $img.attr('src', horn.image);
      $img.appendTo($imgDiv);
      $imgDiv.appendTo($('#horns'));
    });
  };

  this.renderfilterHorns = () => {
    $(`<option>all</option>`).appendTo($('select'));
    this.keywords.forEach(keyword => {
      const $option = $(`<option>${keyword}</option>`);
      $option.appendTo('select');
    });

  };
}

const Horns = new HornCollection();

Horns.getHorns();

function filterHorn() {
  $('select').change(() => {
    let $filterValue = $('select').val();
    if ($filterValue === 'all') {
      $('.image').show();
    } else {
      $('.image').hide();
      $(`.${$filterValue}`).show();
    }
  });
}


