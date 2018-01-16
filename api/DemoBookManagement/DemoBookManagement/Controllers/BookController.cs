using DemoBookManagement.Models.Book;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace DemoBookManagement.Controllers
{
    public class BookController : ApiController
    {

        BookService bookService = new BookService();

        //[HttpGet]
        //public async Task<dynamic> GetAll()
        //{
        //    return await bookService.GetAll();

        //}
     
        [HttpGet, Route("api/Book/GetList")]
        public async Task<dynamic> GetList()
        {
            return await bookService.GetList();
        }

        [HttpGet, Route("api/Book/GetBookById")]
        public async Task<dynamic> GetBookById(int id)
        {
            try
            {
                return await bookService.GetBookById(id);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPost]
        public async Task<dynamic> SaveBook([FromBody]Book book)
        {
            try
            {
                int ret = await bookService.SaveBook(book);
                return Request.CreateResponse(HttpStatusCode.OK, new { Success = ret });
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpGet, Route("api/Book/DeleteBook")]
        public async Task<dynamic> DeleteBook([FromUri] int idBook)
        {
            try
            {
                await bookService.DeleteBook(idBook);
                return new
                {
                    Success = true
                };
            }
            catch (Exception e)
            {
                return new
                {
                    Success = false,
                    Message = e.Message
                };
            }
        }
        //[HttpPost]
        //public HttpResponseMessage PostBook(Book book)
        //{
        //    book = bookService.Add(book);
        //    var response = Request.CreateResponse(HttpStatusCode.Created, book);
        //    string uri = Url.Link("DefaultAPI", new { id = book.Id });

        //    response.Headers.Location = new Uri(uri);
        //    return response;
        //}

        //[HttpPost]
        //public void UpdateBook (int id, Book book)
        //{
        //    book.Id = id;
        //    if (!bookService.Update(book))
        //    {
        //        throw new HttpResponseException(HttpStatusCode.NotFound);
        //    }
        //}

        //[HttpPost]
        //public HttpResponseMessage Delete(int id)
        //{
        //    if (bookService.Delete(id))
        //    {
        //        return new HttpResponseMessage(HttpStatusCode.NoContent);
        //    }
        //    else
        //    {
        //        return new HttpResponseMessage(HttpStatusCode.NotFound);

        //    }
        //}

    }
}
