var mongoose=require('./mongoose.js');
var async=require('async');

async.series([
	open,
	dropDataBase,
	requireModel,
	createUsers,
	requireModel1,
	createProduct,
	requireModel2,
	createCategory,
	requireMess,
	createMassage
	
], function(err,result){
	console.log(arguments);
	mongoose.disconnect();
	process.exit(err ? 255 : 0);
});
function open(callback)
{
	mongoose.connection.on('open', callback);
}

function dropDataBase(callback)
{
	var db=mongoose.connection.db;
	db.dropDatabase(callback);
}
function requireModel(callback)
{
		require('./models/user');
		async.each(Object.keys(mongoose.models), function(modelName,callback)
	{
		mongoose.models[modelName].ensureIndexes(callback);
	},callback);
}
function requireMess(callback)
{
		require('./models/massage');
		async.each(Object.keys(mongoose.models), function(modelName,callback)
	{
		mongoose.models[modelName].ensureIndexes(callback);
	},callback);
}
function requireModel1(callback)
{
		require('./models/product');
		async.each(Object.keys(mongoose.models), function(modelName,callback)
	{
		mongoose.models[modelName].ensureIndexes(callback);
	},callback);
}
function requireModel2(callback)
{
		require('./models/category');
		async.each(Object.keys(mongoose.models), function(modelName,callback)
	{
		mongoose.models[modelName].ensureIndexes(callback);
	},callback);
}
function createUsers(callback){
	

	var users=[];
	async.each(users, function(userData,callback)
	{
		var user= new mongoose.models.User(userData);
		user.save(callback );
			
	},callback);
	
}

function createProduct(callback){
	

	var products=[];
	async.each(products, function(userData,callback)
	{
		var product= new mongoose.models.Product(userData);
		product.save(callback );
			
	},callback);
	
}
function createMassage(callback){
	

	var message=[{
	
		text:'Hello',
		sender:'58755ca757c7a42948e8cc3a',
		username:'google',
		productid:'58755cdb67434e25c002e65a'
	}];
	async.each(message, function(userData,callback)
	{
		var mess= new mongoose.models.Massage(userData);
		mess.save(callback );
			
	},callback);
	
}

function createCategory(callback){
	

	var category=[{
	
		number:'1',
		name:'Аксесуары'
	},{
	
		number:'2',
		name:'Бижутерия'
	},{
	
		number:'3',
		name:'Канцелярия'
	},{
	
		number:'4',
		name:'Косметика'
	},{
	
		number:'5',
		name:'Мебель'
	},{
	
		number:'6',
		name:'Обувь'
	},{
	
		number:'7',
		name:'Женская одежда'
	},{
	
		number:'8',
		name:'Мужская одежда'
	},{
	
		number:'9',
		name:'Сумки'
	},{
	
		number:'10',
		name:'Сад'
	},{
	
		number:'11',
		name:'Подарки и сувениры'
	},{
	
		number:'12',
		name:'Праздники'
	},{
	
		number:'13',
		name:'Посуда'
	},{
	
		number:'14',
		name:'Куклы и игрушки'
	},{
	
		number:'15',
		name:'Текстиль для дома'
	},{
	
		number:'16',
		name:'Товары для творчества'
	},{
	
		number:'17',
		name:'Декор для дома'
	},{
	
		number:'18',
		name:'Для детей'
	},{
	
		number:'19',
		name:'Для животных'
	},
	
	];
	async.each(category, function(userData,callback)
	{
		var category= new mongoose.models.Category(userData);
		category.save(callback );
			
	},callback);
	
}