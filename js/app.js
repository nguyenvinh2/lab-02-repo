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

  this.getHorns = (page) => {
    $.get(page, null, null, 'json')
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
    this.hornList.forEach(horn => {
      $('#horns').append(templateHandle(horn));
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

const horns = new HornCollection();

horns.getHorns('data/page-1.json');

const horns2 = new HornCollection;

horns2.getHorns('data/page-2.json');

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
