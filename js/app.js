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
  this.hornsAmount = [];
  this.sortOptions = ['alphabetical', 'numberofhorns'];

  this.getHorns = () => {
    $.get('data/page-1.json', 'json')
      .then(data => {
        data.forEach(animal => {
          this.hornList.push(new Horn(animal));
          this.keywords.push(animal.keyword);
          this.hornsAmount.push(animal.horns);
        });
        this.renderHorns();
        this.renderfilterHorns();
        this.renderSortHorns();
        filterHorn();
        sortHorns();
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
    $(`<option>all</option>`).appendTo($('#keyword'));
    this.keywords.forEach(keyword => {
      const $option = $(`<option>${keyword}</option>`);
      $option.appendTo('#keyword');
    });
  };

  this.renderSortHorns = () => {
    $(`<option>none</option>`).appendTo($('#sort'));
    this.sortOptions.forEach(sortOption => {
      const $option = $(`<option>${sortOption}</option>`);
      $option.appendTo('#sort');
    });
  };
}

const Horns = new HornCollection();

Horns.getHorns();

function filterHorn() {
  $('#keyword').change(() => {
    let $filterValue = $('#keyword').val();
    if ($filterValue === 'all') {
      $('.image').show();
    } else {
      $('.image').hide();
      $(`.${$filterValue}`).show();
    }
  });
}

function sortHorns() {
  $('#sort').change(() => {
    let $sortValue = $('#sort').val();
    if ($sortValue === 'none') {
      $('.image').show();
    } else if ($sortValue === 'alphabetical') {
      $('.image').hide();
      Horns.hornList.sort((a, b) => a.keyword.localeCompare(b.keyword));
      Horns.renderHorns();
    } else if ($sortValue === 'numberofhorns') {
      $('.image').hide();
      Horns.hornList.sort((a, b) => a.horns - b.horns);
      Horns.renderHorns();
    }
  });
}
