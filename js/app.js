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

  this.getHorns = (page, pageNumber) => {
    $.get(page, null, null, 'json')
      .then(data => {
        this.hornList = [];
        data.forEach(animal => {
          this.hornList.push(new Horn(animal));
          this.hornsAmount.push(animal.horns);
          if (!this.keywords.includes(animal.keyword)) {
            this.keywords.push(animal.keyword);
          }
        });
        this.renderfilterHorns();
        this.renderSortHorns();
        this.renderPageOptions(pageNumber);
        filterHorn();
        sortByAlpha();
        sortHorns();
      });
  };

  this.renderHorns = () => {
    $('#horns').empty();
    this.hornList.forEach(horn => {
      $('#horns').append(templateHandle(horn));
    });
  };

  this.renderfilterHorns = () => {
    $('#keyword').empty();
    $(`<option>all</option>`).appendTo($('#keyword'));
    this.keywords.forEach(keyword => {
      const $option = $(`<option>${keyword}</option>`);
      $option.appendTo('#keyword');
    });
  };

  this.renderSortHorns = () => {
    $('#sort').empty();
    this.sortOptions.forEach(sortOption => {
      const $option = $(`<option>${sortOption}</option>`);
      $option.appendTo('#sort');
    });
  };

  this.renderPageOptions = number => {
    $('#page').empty();
    for (let i = 1; i <= 2; i++) {
      const $option = $(`<option>${i}</option>`);
      $option.appendTo('#page');
    }
    $('#page').val(number);
    pageSelect();
  };
}

const Horns = new HornCollection();

Horns.getHorns('data/page-1.json', 1);

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
    keyword: horn.keyword,
    desc: horn.description
  };

  let $source = $('#entry').html();
  let template = Handlebars.compile($source);
  return template(context);
}

function sortHorns() {
  $('#sort').change(() => {
    let $sortValue = $('#sort').val();
    if ($sortValue === 'alphabetical') {
      sortByAlpha();
    } else if ($sortValue === 'numberofhorns') {
      sortByNumber();
    }
  });
}

function sortByAlpha() {
  Horns.hornList.sort((a, b) => a.title.localeCompare(b.title));
  Horns.renderHorns();
}

function sortByNumber() {
  Horns.hornList.sort((a, b) => a.horns - b.horns);
  Horns.renderHorns();
}

function pageSelect() {
  $('#page').change(() => {
    let $pageValue = $('#page').val();
    if ($pageValue === '1') {
      Horns.getHorns('data/page-1.json', $pageValue);
    } else if ($pageValue === '2') {
      Horns.getHorns('data/page-2.json', $pageValue);
    }
  });
}
