using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.ManagedDataAccess;
using System.Data.Common;
using System.Data;
using System.Threading.Tasks;
using System.Collections;
using Oracle.ManagedDataAccess.Client;

namespace DemoBookManagement.Models.Book
{
    public class DbConnection
    {

       public static object ExecuteNonQueryReturnValue(string conString,
       string store,
       string[] thamso,
       object[] giatri,
       string[] cursors)
        {
            using (OracleConnection conn = new OracleConnection(conString))
            {
                using (OracleCommand comm = new OracleCommand())
                {
                    comm.Connection = conn;
                    comm.CommandText = store;
                    comm.CommandType = System.Data.CommandType.StoredProcedure;
                    if (thamso != null)
                        for (int i = 0; i < thamso.Length; i++)
                        {
                            comm.Parameters.Add(thamso[i], giatri[i]);
                        }
                    for (int i = 0; i < cursors.Length; i++)
                    {
                        comm.Parameters.Add(new OracleParameter(cursors[i], OracleDbType.RefCursor)).Direction = ParameterDirection.Output;
                    }
                    conn.Open();
                    comm.ExecuteNonQuery();
                    var result = (int)comm.Parameters[cursors[0]].Value;
                    conn.Close();
                    return result;
                }
            }
        }
        public static Task<DataTable> ExecuteDataTableTask(string conString,
        string store,
        string[] thamso = null,
        object[] giatri = null,
        string[] cursors = null)
        {
            if (cursors == null)
                cursors = new string[] { "cv_1" };
            Task<DataTable> task = Task<DataTable>.Run(() =>
            {
                return ExecuteDataTable(conString, store, thamso, giatri, cursors);
            });
            return task;
        }
        public static Task ExecuteNonQueryTask(string conString,
        string store,
        string[] thamso,
        object[] giatri)
        {
            Task task = Task.Run(() =>
            {
                ExecuteNonQuery(conString, store, thamso, giatri);
            });
            return task;
        }
        public static DataTable ExecuteDataTable(string conString,
            string store,
            string[] thamso,
            object[] giatri,
            string[] cursors)
        {
            using (OracleConnection conn = new OracleConnection(conString))
            {
                using (OracleCommand comm = new OracleCommand())
                {
                    comm.Connection = conn;
                    comm.CommandText = store;
                    comm.CommandType = System.Data.CommandType.StoredProcedure;
                    if (thamso != null)
                        for (int i = 0; i < thamso.Length; i++)
                        {
                            comm.Parameters.Add(thamso[i], giatri[i]);
                        }
                    for (int i = 0; i < cursors.Length; i++)
                    {
                        comm.Parameters.Add(new OracleParameter(cursors[i], OracleDbType.RefCursor)).Direction = ParameterDirection.Output;
                    }

                    DataTable dt = new DataTable();
                    OracleDataAdapter da = new OracleDataAdapter();
                    da.SelectCommand = comm;
                    conn.Open();
                    da.Fill(dt);
                    conn.Close();
                    return dt;
                }
            }
        }
        // Execute Procedure Oracle: output value
        public static Task<int> ExecuteProcedureTask(string conString, string functionName, string[] paraName = null, object[] paraValue = null)
        {
            Task<int> task = Task<int>.Run(() =>
            {
                return ExecuteProcedure(conString, functionName, paraName, paraValue);
            });
            return task;
        }
        public static int ExecuteProcedure(string conString, string functionName, string[] paraName, object[] paraValue)
        {
            using (OracleConnection conn = new OracleConnection(conString))
            {
                using (OracleCommand comm = new OracleCommand())
                {
                    comm.Connection = conn;
                    comm.CommandText = functionName;
                    comm.CommandType = System.Data.CommandType.StoredProcedure;

                    if (paraName != null)
                        for (int i = 0; i < paraName.Length; i++)
                        {
                            comm.Parameters.Add(paraName[i], paraValue[i]);
                        }
                    comm.Parameters.Add(new OracleParameter("OutputValue", OracleDbType.Int32)).Direction = ParameterDirection.Output;

                    try
                    {
                        conn.Open();
                        comm.ExecuteNonQuery();
                        int value = int.Parse(comm.Parameters["OutputValue"].Value.ToString());
                        conn.Close();
                        return value;
                    }
                    catch (Exception ex)
                    {
                        var e = ex;
                        return -1;
                    }
                }
            }
        }

        public static void ExecuteNonQuery(string conString,
          string store,
          string[] thamso,
          object[] giatri)
        {

            using (OracleConnection conn = new OracleConnection(conString))
            {
                using (OracleCommand comm = new OracleCommand())
                {
                    comm.Connection = conn;
                    comm.CommandText = store;
                    comm.CommandType = CommandType.StoredProcedure;
                    for (int i = 0; i < thamso.Length; i++)
                    {
                        object paramValue = giatri[i];
                        if (paramValue is IList && paramValue.GetType().GetGenericTypeDefinition().IsAssignableFrom(typeof(List<>)))
                        {
                            List<int> list = (List<int>)paramValue;
                            int[] array = list.ToArray();
                            OracleParameter p_dataIDs = new OracleParameter("v_list", OracleDbType.Int32, array.Length, array, ParameterDirection.Input);
                            p_dataIDs.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
                            comm.Parameters.Add(p_dataIDs);
                        }
                        else
                        {
                            if (paramValue == null) paramValue = DBNull.Value;
                            var param = comm.Parameters.Add(thamso[i], paramValue);
                        }

                    }
                    try
                    {
                        conn.Open();
                        comm.ExecuteNonQuery();
                        conn.Close();
                    }
                    catch (Exception e)
                    {
                        var ex = e;
                    }

                }
            }
        }

    }



}