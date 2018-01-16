using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Threading.Tasks;

namespace DemoBookManagement.Models.Book
{
    public class BookService
    {

        public List<Book> bookList = new List<Book>();
        //private int id = 0;

        public static Task<DataTable> TienIchDB { get; private set; }

        public BookService()
        {
            //this.Add(new Book(){ Id = 1, Name = "book 1", Author = "author 1", Description = "description 1"});
            //this.Add(new Book(){ Id = 1, Name = "book 2", Author = "author 2", Description = "description 2" });
            //this.Add(new Book(){ Id = 1, Name = "book 3", Author = "author 3", Description = "description 3" });
            //this.Add(new Book(){ Id = 1, Name = "book 4", Author = "author 4", Description = "description 4" });
        }

        public List<Book> GetAll()
        {
            return bookList;

        }

        public async Task<dynamic> GetBookById(int Id)
        {
            string conString = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            DataTable tabl = await DbConnection.ExecuteDataTableTask(conString, "get_book_test",
                new string[] { "@Id" }, new object[] { Id });
            return (from r in tabl.AsEnumerable()
                    select new
                    {
                        Id = r.Field<object>("Id"),
                        Name = r.Field<object>("Name"),
                        Author = r.Field<object>("Author"),
                        Description = r.Field<object>("Description"),

                    }).ToList();
        }

        public  async Task<dynamic> SaveBook(Book book)
        {
            string conString = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            return await DbConnection.ExecuteProcedureTask(conString, "book_test_save",
                new string[] { "@Id", "@Name", "@Author", "@Description" },
                new object[] { book.Id, book.Name, book.Author, book.Description });
        }

        public bool Update(Book book)
        {
            int id = bookList.FindIndex(x => x.Id == book.Id);
            if (id == -1){
                return false;
            }
            else {
                bookList.RemoveAt(id);
                bookList.Add(book);
                return true;
            }


        }

        public async Task<dynamic> GetList()
        {
            string conString = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            DataTable tabl = await DbConnection.ExecuteDataTableTask(conString, "book_list",
                new string[] { }, new object[] { });

            return (from r in tabl.AsEnumerable()
                    select new
                    {
                        Id = r.Field<object>("Id"),
                        Name = r.Field<object>("Name"),
                        Author = r.Field<object>("Author"),
                        Description = r.Field<object>("Description"),

                    }).ToList();
        }

        public async Task DeleteBook(int Id)
        {
            string conString = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            await DbConnection.ExecuteNonQueryTask(conString, "book_test_delete",
                new string[] { "@Id" }, new object[] { Id });
        }



    }
}