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

  this.getHorns = (page) => {
    $.get(page, null, null, 'json')
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
    this.hornList.forEach(horn => {
      // const $imgDiv = $(`<div class="image ${horn.keyword}"></div>`);
      // const $img = $('<img/>');
      // const $title = $(`<h2>${horn.title.toUpperCase()}</h2>`);
      // $title.appendTo($imgDiv);
      // $img.attr('src', horn.image);
      // $img.appendTo($imgDiv);
      // $imgDiv.appendTo($('#horns'));
      $('#horns').append(templateHandle(horn));
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

const horns = new HornCollection();

horns.getHorns('data/page-1.json');

const horns2 = new HornCollection;

horns2.getHorns('data/page-2.json');

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

function templateHandle(horn) {
  let context = {
    title: horn.title.toUpperCase(),
    path: horn.image,
    keyword: horn.keyword
  };

  let $source = $('#entry').html();
  console.log($source);
  let template = Handlebars.compile($source);
  return template(context);
}

