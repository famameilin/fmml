var that;
class Tab {

	constructor(tab) {
		this.tab = document.querySelector(tab);
		this.ul = this.tab.querySelector('ul');
		this.section = this.tab.querySelector('section');
		this.span = this.tab.querySelector('span');
		that = this;
		this.init();
	}

	init() {
		//动态获取元素并且绑定事件
		this.lis = this.tab.querySelectorAll('li');
		this.div = this.tab.querySelectorAll('div');
		this.i = this.tab.querySelectorAll('i');
		for (var i = 0; i < this.lis.length; i++) {
			this.lis[i].index = i;
			this.lis[i].addEventListener('click', this.toggleTab)
			this.lis[i].addEventListener('dblclick', this.editTab)
			this.i[i].addEventListener('click', this.removeTab)
			this.div[i].addEventListener('dblclick', this.editTab)
		}
		this.span.addEventListener('click', this.addTab)
	}
	//切换tab
	toggleTab(e) {
		e.stopPropagation();
		document.querySelector('.select').classList.remove('select');
		document.querySelector('.choice').classList.remove('choice');
		this.className = 'select';
		that.div[this.index].className = 'choice';
	}
	//删除tab
	removeTab(e) {
		that.init();
		e.stopPropagation();
		console.log(this.parentNode.flag)
		if (this.parentNode.className == 'select' && that.lis.length != 1) {
			if (this.parentNode.index == that.lis.length - 1) {
				that.lis[this.parentNode.index - 1].className = 'select';
			}
			else {
				that.lis[this.parentNode.index + 1].className = 'select';
			}
		}
		this.parentNode.remove();

	}
	//添加tab
	addTab() {
		if (that.lis.length < 5) {
			var li = document.createElement('li');
			var divs = document.createElement('div');
			li.innerHTML = 'new Tab<i></i>';
			divs.innerHTML = Math.random();
			that.ul.appendChild(li);
			that.section.appendChild(divs);
			that.init();
			that.lis[that.lis.length - 1].click();
		}
	}
	//修改tab和内容
	editTab() {
		this.innerHTML = "<input type='text' value=" + this.innerText + "></input>";
		this.children[0].select();
		this.children[0].addEventListener('blur', function () {
			this.parentNode.innerHTML = this.value + '<i></i>';
		})
		this.children[0].addEventListener('keyup', function (e) {
			if (e.key == 'Enter') {
				this.blur();
			}
		})

	}
}
