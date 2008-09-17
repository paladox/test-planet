# -*- coding: utf-8 -*-
# A simple RSS 2.0 generator for rawdog
# Copyright Jonathan Riddell 2008
# May be copied only under the terms of the GNU GPL version 2 or later
#
# Writes RSS feed at the end of a rawdog run 
# Put in <configdir>/plugins/rawdog_rss.py
# Add "define outputxml /path/to/feed.rss" to config to set file out

import os, time, cgi
import rawdoglib.plugins, rawdoglib.rawdog
import libxml2

from time import gmtime, strftime

class RSS_Feed:
    def __init__(self, rawdog, config):
        if config['defines'].has_key('outputxml'):
            self.out_file = config['defines']['outputxml']
        else:
            self.out_file = 'rss20.xml'
        self.doc_open()

        self.xml_articles = self.xml.xpathEval('/rss/channel')[0]

        self.xml_articles.newChild(None, 'title', "Planet KDE")
        self.xml_articles.newChild(None, 'link', "http://planetKDE.org/")
        self.xml_articles.newChild(None, 'language', "en")
        self.xml_articles.newChild(None, 'description', "Planet KDE - http://planetKDE.org/")
        atomLink = self.xml_articles.newChild(None, 'atom:link', None)
        atomLink.setProp('href', 'http://planetKDE.org/rss20.xml')
        atomLink.setProp('rel', 'self')
        atomLink.setProp('type', 'application/rss+xml')

    def doc_open(self):
        self.doc = libxml2.newDoc("1.0")
        self.xml = self.doc.newChild(None, 'rss', None)

        self.xml.setProp('version', "2.0")            
        self.xml.setProp('xmlns:dc', "http://purl.org/dc/elements/1.1/")            
        self.xml.setProp('xmlns:atom', 'http://www.w3.org/2005/Atom')

        self.xml.newChild(None, 'channel', None)

    def describe(self, parent, description):
        try:
            parent.newChild(None, 'description', description)
        except TypeError:
            print "TypeError in description"

    def __article_sync(self, xml_article, rawdog, config, article):
        entry_info = article.entry_info
        guid = xml_article.newChild(None, 'guid', article.hash)
        guid.setProp('isPermaLink', 'false')
        try:
            title = entry_info['title_raw'].encode('utf8', 'ignore')
        except KeyError:
            print "KeyError on title"
            return
        for feed in config["feedslist"]:
            if feed[0] == article.feed:
                title = feed[2]["define_name"] + ": " + title
        xml_article.newChild(None, 'title', title)
        date = strftime("%a, %d %b %Y %H:%M:%S", gmtime(article.date)) + " +0000"
        xml_article.newChild(None, 'pubDate', date)
        if entry_info.has_key('link'):
            xml_article.newChild(None, 'link', entry_info['link'])

        if entry_info.has_key('content'):
            for content in entry_info['content']:
                content = content['value']
        elif entry_info.has_key('summary_detail'):
            content = entry_info['summary_detail']['value']
        content = cgi.escape(content).encode('utf8', 'ignore')
        self.describe(xml_article, content)

        return True

    def __write(self):
        self.doc.saveFormatFile(self.out_file, 1)
        self.doc.freeDoc()

    def output_write(self, rawdog, config, articles):
        for article in articles:
            if article.date is not None:
                xml_article = self.xml_articles.newChild(None, 'item', None)
                self.__article_sync(xml_article, rawdog, config, article)

        self.__write()
        return True

def startup(rawdog, config):
    rss_feed = RSS_Feed(rawdog, config)
    rawdoglib.plugins.attach_hook("output_write", rss_feed.output_write)
    return True
rawdoglib.plugins.attach_hook("startup", startup)
