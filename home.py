# -*- coding: utf-8 -*-
__author__ = 'aramirez'

import flask
from flask import render_template, redirect, url_for, session, request
import class_db
from libgral import numeracion_paginas, ObtenerFecha
import logger
import os
from datetime import datetime
from libgral import revisarProceso


class Home(flask.views.MethodView):
    def get(self):
        if len(session) > 1:
            indice = str(request.args.get('indice'))
            fecha_inicio = str(request.args.get('fecha1'))
            fecha_fin = str(request.args.get('fecha2'))
            pagina_activa = str(request.args.get('num_pagina'))
            if indice != 'None' and fecha_inicio != 'None' and fecha_fin != 'None':
                codigo_paginacion = numeracion_paginas(fecha_inicio, fecha_fin, pagina_activa, indice, 'home')
                dic_home = datos_home(indice)
                if len(dic_home['tabla_ventas']) == 57:
                    return render_template('home.html',
                                       dic_home=dic_home)
                else:
                    return render_template('home.html',
                                       dic_home=dic_home,
                                       codigo_paginacion = codigo_paginacion)
            else:
                dic_home = datos_home(0)
                fecha_inicio = ObtenerFecha()
                fecha2 = fecha_inicio.split('-')
                fecha2[0] = int(fecha2[0]) + 1
                fecha_fin = '-'.join(str(x) for x in fecha2)
                codigo_paginacion = numeracion_paginas(fecha_inicio, fecha_fin, 1, 0, 'home')
                if len(dic_home['tabla_ventas']) == 71:
                    return render_template('home.html',
                                       dic_home=dic_home)
                else:
                    return render_template('home.html',
                                       dic_home=dic_home,
                                       codigo_paginacion = codigo_paginacion)
        else:
            ip = request.remote_addr
            logger.seguridad('INTENTO DE BURLAR LA SEGURIDAD| IP RESPONSABLE: ' + ip)
            return redirect(url_for('login'))


def datos_home(indice):

    dic_home = {'ticket': class_db.ticket_actual(), 
                'total_ventas': class_db.ventas_del_dia(),
                't_apertura': class_db.tiempo_apertura(), 
                'tarifa': class_db.tarifa(),
                'estado_sistem': '',
                'tabla_ventas': ultimas_ventas(indice),
                'log': estadoLogs(), 
                'socketPython': "", 
                'socketC': "",
                'cerradura': class_db.consultarCerradura()}

    dic_home['socketPython'], dic_home['socketC'] = revisarProceso()

    if dic_home['socketPython']:
        dic_home['socketPython'] = "Activo"
    else:
        dic_home['socketPython'] = "Desactivo"

    if dic_home['socketC']:
        dic_home['socketC'] = "Activo"
    else:
        dic_home['socketC'] = "Desactivo"

    return dic_home


def ultimas_ventas(indice):
    fecha_inicio = ObtenerFecha()
    fecha2 = fecha_inicio.split('-')
    fecha2[0] = int(fecha2[0]) + 1
    fecha_fin = '-'.join(str(x) for x in fecha2)
    tabla_ultimas_ventas = cod_tabla(fecha_inicio, fecha_fin, indice)
    return tabla_ultimas_ventas


def estadoLogs():
    directorio = "/var/log/KERNOTEK/"
    archivos = ['ERROR', 'WARNING', 'CRITICAL']
    for log in archivos:
        ruta = directorio + log
        if os.path.exists(ruta):
            file = open(ruta, "r")
            lista = file.readlines()
            num_registros = len(lista)
            msg = lista[num_registros - 1]
            msg = msg.split('|')
            fechaSistema = str(datetime.today().strftime('%y-%m-%d'))
            fecha = msg[0]
            fecha = fecha.split(" ")
            fecha = fecha[0]
            if fecha == fechaSistema:
                return "Revisar el apartado de logs"
                break
    return "OK"

def cod_tabla(fecha_inicio, fecha_fin, inicio):
    dicCabezeras = {'ticket': 'Ticket', 'localshift': 'Turno', 'datetimesell': 'Fecha', 'rate': 'Tarifa', 'deposit': 'Depósito'}
    dicVenta = []
    cabezerasDisponibles = class_db.columnas_habilitadas()
    codigo_tabla = ""
    bandera_color = True
    codigo_tabla += str('<div class="portlet box green">')         # Código del div
    codigo_tabla += str(""" <div class="portlet-title">
            <div class="caption">
              <i class="fa fa-bar-chart-o"></i>Ventas del día
            </div>
          </div>
          <div class="portlet-body flip-scroll">
            <table class="table table-bordered table-striped table-condensed flip-content table-hover">""")

    codigo_tabla += str('<thead class="flip-content text-center c-blue">')  # Etiqueta de head para la tabla
    codigo_tabla += str('<tr>')                                             # Inicio de las cabezeras
    for cabezera in cabezerasDisponibles:
        codigo_tabla += str('<th width="20%"class="text-center">')
        codigo_tabla += dicCabezeras[cabezera]
        dicVenta.append( dicCabezeras[cabezera] )
        codigo_tabla += str('</th>')

    codigo_tabla += str('</tr>')            # Fin de las cebezeras
    codigo_tabla += str('</thead>')         # Fin de head

    codigo_tabla += str('<tbody class="text-center">')                   # Inicio del contenido de la tabla
    tabla_ventas = class_db.paginacion(fecha_inicio, fecha_fin, inicio)
    if len(tabla_ventas) == 0:
        return str('<h1 align="center"><strong>No hay ventas hasta el momento</strong></h1>')
    else:

        for ventas in tabla_ventas:
	    #print ventas
            if bandera_color:
                codigo_tabla += str('<tr class="info">')
                bandera_color = False
            else:
                codigo_tabla += str('<tr>')
                bandera_color = True
            for venta, columna in zip(ventas, dicVenta):
                #if columna == "Tarifa" and venta == 0:
                #    venta =str(class_db.tarifa())
                if columna == "Depósito"and venta == 0:
                    venta = "Cortesía"
                codigo_tabla += str("<td>") + str(venta) + str("</td>")
            codigo_tabla += str("</tr>")

    codigo_tabla += str('</tbody>')             #Fin del contenido de la tabla
    codigo_tabla += str('</table>')   # Fin de la tabla

    return codigo_tabla

