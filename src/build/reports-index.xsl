<?xml version="1.0" encoding="utf-8"?>

<!-- $Id$ -->
<xsl:transform xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:param name="basedir"/>
    <xsl:param name="ant.project.name"/>
    <xsl:param name="svn.revision"/>
    <xsl:param name="suse.version"/>
    <xsl:param name="version"/>
    <xsl:param name="timestamp"/>

    <xsl:variable name="title" select="concat('Build Reports for ',
      $ant.project.name, ' (version ', $version, ' r', $svn.revision, ')')"/>

    <xsl:output method="html"/>

    <xsl:template match="/">
    <html>
        <head>
            <title><xsl:value-of select="$title"/></title>
        </head>
        <body>
            <table width="100%" cellspacing="0" border="0" cellpadding="2">
                <tr><td colspan="2" bgcolor="#7799ee"><b>&#160;<xsl:value-of select="$title"/></b></td></tr>
                <table cellpadding="1" border="0" cellspacing="0">
                    <tr><td align="right">Directory:</td><td>&#160;<code><xsl:value-of select="$basedir"/></code></td></tr>
                    <tr><td align="right">Build Time:</td><td>&#160;<xsl:value-of select="$timestamp"/></td></tr>
                </table>
            </table>
            <ul>
                <li><a href="tests/index.html">Unit Tests</a></li>
                <li><a href="coverage/index.html">Cobertura</a></li>
                <li><a href="checkstyle/index.html">Checkstyle</a></li>
                <li><a href="javadoc/index.html">Javadoc</a></li>
                <li><a href="../../src/ivy/ivyroundup/ivy.xml">Ivy file</a></li>
            </ul>
        </body>
    </html>
    </xsl:template>
</xsl:transform>

