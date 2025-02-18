var debug = true;

function debugAlert(text)
{
    if (debug) console.log(text);
}

function getTodayDate() {
    var tdate = new Date();
    var dd = tdate.getDate(); //yields day
    var MM = tdate.getMonth(); //yields month
    var yyyy = tdate.getFullYear(); //yields year
    var currentDate = dd + "/" + (MM + 1) + "/" + yyyy;

    return currentDate;
}

function parseBBCode(str) {
    var result = XBBCODE.process({
        text: str,
        removeMisalignedTags: false,
        addInLineBreaks: true
    });
    var resultat = result.html;
    //alert(resultat);
    resultat = resultat.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    return resultat;
}

function nl2br(str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function changePage(id) {
    debugAlert("Début changePage(" + id + ")");
    var tabId = id.split("_");
    var idPage = "fiche_" + tabId[1];
    $(".woa_page").hide();
    $(".woa_tab").each(function(index) {
        if ($(this).attr("id") == id) {
            $(this).addClass("woa_tab_actif");
            $("#" + idPage).show();
        } else {
            $(this).removeClass("woa_tab_actif");
        }
    });
    generateFiche($("#page_id").val());
    debugAlert("Fin changePage(" + id + ")");
}

function toggle(id) {
    debugAlert("Début toggle(" + id + ")");
    var obj = $("#" + id);
    switch(id) {
        case "perso_predef":
            if (obj.prop('checked') == true) {
                $(".predefini_non").hide();
                $(".predefini_oui").show();
            } else {
                $(".predefini_non").show();
                $(".predefini_oui").hide();
            }
            break;
        case "tpl_cont_allmargin":
            if (obj.prop('checked') == true) {
                $(".cont_allmargin_non").hide();
                $(".cont_allmargin_oui").show();
            } else {
                $(".cont_allmargin_non").show();
                $(".cont_allmargin_oui").hide();
            }
            break;
        case "tpl_cont_allbordercolor":
            if (obj.prop('checked') == true) {
                $(".cont_allbordercolor_non").hide();
                $(".cont_allbordercolor_oui").show();
            } else {
                $(".cont_allbordercolor_non").show();
                $(".cont_allbordercolor_oui").hide();
            }
            break;
        case "tpl_cont_allbordersize":
            if (obj.prop('checked') == true) {
                $(".cont_allbordersize_non").hide();
                $(".cont_allbordersize_oui").show();
            } else {
                $(".cont_allbordersize_non").show();
                $(".cont_allbordersize_oui").hide();
            }
            break;
        case "tpl_cont_allborderradius":
            if (obj.prop('checked') == true) {
                $(".cont_allborderradius_non").hide();
                $(".cont_allborderradius_oui").show();
            } else {
                $(".cont_allborderradius_non").show();
                $(".cont_allborderradius_oui").hide();
            }
            break;
        case "tpl_feat_display":
            if (obj.prop('checked') == true) {
                $(".feat_display_non").hide();
                $(".feat_display_oui").show();
            } else {
                $(".feat_display_non").show();
                $(".feat_display_oui").hide();
            }
            break;
        case "tpl_footer_display":
            if (obj.prop('checked') == true) {
                $(".footer_display_non").hide();
                $(".footer_display_oui").show();
            } else {
                $(".footer_display_non").show();
                $(".footer_display_oui").hide();
            }
            break;
    }
    debugAlert("Fin toggle(" + id + ")");
}

function changeGenerateur(page) {
    debugAlert("Début changeGenerateur(" + page + ")");
    $(".woa_page_container").load('./pages/' + page + '.htm', function() {
        $(".woa_switch input[type=checkbox]").each(function(){
            toggle($(this).attr("id"));
            $("#" + $(this).attr("id")).bind("click", function() {
                toggle($(this).attr("id"));
            });
        });
        $(".woa_addline").each(function(){
            addLigne($(this).attr("id"));
            $("#" + $(this).attr("id")).bind("click", function() {
                addLigne($(this).attr("id"));
            });
        });

        changePage("tab_formulaire");

        $(".woa_textecopie").hide();
        $(".woa_tab").bind("click", function() {
            changePage($(this).attr("id"));
        });

        $(".woa_liencopie").bind("click", function() {
            $("#code").select();
            document.execCommand("copy");
            $(".woa_textecopie").show().delay(4000).animate({
                opacity: 0
            }, "slow");
        });

        $('.woa_champ_ta').each(function() {
            this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
        }).on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
    debugAlert("Fin changeGenerateur(" + page + ")");
}

function generateFiche(page) {
    debugAlert("Début generateFiche(" + page + ")");
    switch (page) {
        case "perso":
            generateFichePerso();
            break;
        case "chrono":
            generateFicheChrono();
            break;
        case "liens":
            generateFicheLiens();
            break;
        case "template":
            generateTemplateRp();
            break;
    }
    debugAlert("Fin generateFiche(" + page + ")");
}

function generateFichePerso() {
    debugAlert("Début generateFichePerso");
    // Valeurs par défaut
    var perso_image = $("#perso_image").val() != "" ? $("#perso_image").val() : "https://i.imgur.com/yfVYiaY.png";
    var perso_nom_prenom = $("#perso_nom_prenom").val() != "" ? $("#perso_nom_prenom").val() : "PRÉNOM ET NOM DU PERSONNAGE";
    var perso_citation = $("#perso_citation").val() != "" ? $("#perso_citation").val() : "« Duis interdum elementum ligula, sit amet dignissim purus ullamcorper at. Pellentesque a lacinia mauris. Donec leo urna, maximus sed hendrerit id.  »";
    var perso_predef = $("#perso_predef").prop('checked');
    var perso_race = $("#perso_race").val() != "" ? $("#perso_race").val() : "Réponse";
    var perso_age = $("#perso_age").val() != "" ? $("#perso_age").val() : "Réponse";
    var perso_taille_poids = $("#perso_taille_poids").val() != "" ? $("#perso_taille_poids").val() : "Réponse";
    var perso_faction = $("#perso_faction").val() != "" ? $("#perso_faction").val() : "Réponse";
    var perso_religion = $("#perso_religion").val() != "" ? $("#perso_religion").val() : "Réponse";
    var perso_sexe = $("#perso_sexe").val() != "" ? $("#perso_sexe").val() : "Réponse";
    var perso_metier = $("#perso_metier").val() != "" ? $("#perso_metier").val() : "Réponse";
    var perso_alignement = $("#perso_alignement").val() != "" ? $("#perso_alignement").val() : "Réponse";
    var perso_rang = $("#perso_rang").val() != "" ? $("#perso_rang").val() : "Réponse";
    var perso_avatar = $("#perso_avatar").val() != "" ? $("#perso_avatar").val() : "Personnage présent sur l'avatar";
    var perso_histoire = $("#perso_histoire").val() != "" ? $("#perso_histoire").val() : "[b](500 mots minimum)[/b]\nRacontez ici l'histoire de votre personnage ainsi que ses actions importantes.\nVeuillez s.v.p. soigner votre français et lire les règles du forum avant tout.";
    var perso_physique = $("#perso_physique").val() != "" ? $("#perso_physique").val() : "[b](250 mots minimum)[/b]\nDécrivez les aspects psychologiques et physiques importants de votre personnage.";
    var perso_testrp = $("#perso_testrp").val() != "" ? $("#perso_testrp").val() : "Composez votre test-rp ici. Avant de commencer, veuillez bien lire les consignes concernant les rangs et les personnages prédéfinis. Tout manquement au niveau de ces règles peut entraîner un refus de votre test-rp.";
    var perso_mort = $("#perso_mort").val() != "" ? $("#perso_mort").val() : "Décrivez la mort de votre personnage en quelques mots (250 max), si jamais vous veniez à quitter le forum sans avoir eu le temps d'écrire jusque là!";
    var perso_vocation = $("#perso_vocation").val();
    var perso_pouvoirs = $("#perso_pouvoirs").val() != "" ? $("#perso_pouvoirs").val() : "Inscrivez ici tous vos pouvoirs du début. [b]Merci de bien lire les règlements concernant cet aspect du forum avant de vous lancer ![/b] Une fois votre présentation validée, cette partie ne sera plus modifiable par vos soins et chaque mise à jour nécessitera des crédits.\n[b]N'oubliez pas qu'acheter un palier donné pour un pouvoir, nécessite l'achat des paliers inférieurs également ![/b]";
    var perso_objets = $("#perso_objets").val() != "" ? $("#perso_objets").val() : "Inscrivez ici tous vos objets et armes du début. Merci de bien lire les règlements concernant cet aspect du forum avant de vous lancer ! Une fois votre présentation validée, cette partie ne sera plus modifiable par vos soins et chaque mise à jour fera l'objet d'une demande au staff.";
    var perso_vignette = $("#perso_vignette").val() != "" ? $("#perso_vignette").val() : "https://i.imgur.com/7n93rOO.png";
    var perso_pseudo = $("#perso_pseudo").val() != "" ? $("#perso_pseudo").val() : "Réponse";
    var perso_connu = $("#perso_connu").val() != "" ? $("#perso_connu").val() : "Réponse";
    var perso_avis = $("#perso_avis").val() != "" ? $("#perso_avis").val() : "Réponse";
    var perso_connexion = $("#perso_connexion").val() != "" ? $("#perso_connexion").val() : "Réponse";

    var code_html = "";
    code_html += "<img src=\"" + perso_image + "\" /> <div class=\"mep_pres_psfond\"><div class=\"mep_pres_pseudo\">" + perso_nom_prenom + "</div><div class=\"mep_pres_citation\">" + perso_citation + "</div></div><div class=\"mep_su_titrebord\"></div> <div class=\"mep_fond_pres\"> <div class=\"mep_pres_infogen\">INFORMATIONS GÉNÉRALES</div> <div class=\"mep_pres_infos\"><span class=\"mep_po\">RACE :</span> " + perso_race + "\n";
    code_html += "<span class=\"mep_po\">ÂGE :</span> " + perso_age + "\n";
    code_html += "<span class=\"mep_po\">TAILLE & POIDS :</span> " + perso_taille_poids + "\n";
    code_html += "<span class=\"mep_po\">FACTION :</span> " + perso_faction + "\n";
    code_html += "<span class=\"mep_po\">RELIGION :</span> " + perso_religion + "</div>  <div class=\"mep_pres_infos\"><span class=\"mep_po\">SEXE :</span> " + perso_sexe + "\n";
    code_html += "<span class=\"mep_po\">MÉTIER :</span> " + perso_metier + "\n";
    code_html += "<span class=\"mep_po\">ALIGNEMENT :</span> " + perso_alignement + "\n";
    code_html += "<span class=\"mep_po\">RANG DÉSIRÉ :</span> " + perso_rang + "\n";
    code_html += "<span class=\"mep_po\">AVATAR :</span> " + perso_avatar + "</div> "
    if (!perso_predef) {
        code_html += "<div class=\"mep_pres_bloctitre\">Histoire du personnage</div> <div class=\"mep_pres_bloc\">" + perso_histoire + "</div><div class=\"mep_pres_bloctitre\">Physique et psychologie</div> <div class=\"mep_pres_bloc\">" + perso_physique + "</div> ";
    } else {
        code_html += "<div class=\"mep_pres_bloctitre\">Test-rp</div> <div class=\"mep_pres_bloc\">" + perso_testrp + "</div>";
    }
    code_html += "<div class=\"mep_pres_bloctitre\">Mort du personnage</div> <div class=\"mep_pres_bloc\">" + perso_mort + "</div><div class=\"mep_pres_bloctitre\">Pouvoirs (" + perso_vocation + ")</div> <div class=\"mep_pres_bloc\">" + perso_pouvoirs + "</div><div class=\"mep_pres_bloctitre\">Objets et armes</div> <div class=\"mep_pres_bloc\">" + perso_objets + "</div> <img src=\"" + perso_vignette + "\" class=\"mep_pres_img\" /> <div class=\"mep_pres_perso\"> <div class=\"mep_pres_persotitre\">DERRIÈRE L'ÉCRAN</div><span class=\"mep_po\">PSEUDO :</span>  " + perso_pseudo + "\n";
    code_html += "<span class=\"mep_po\">COMMENT AVEZ-VOUS CONNU LE FORUM ?</span> " + perso_connu + "\n";
    code_html += "<span class=\"mep_po\">AVIS SUR LE FORUM :</span> " + perso_avis + "\n";
    code_html += "<span class=\"mep_po\">FRÉQUENCE DE CONNEXION :</span> " + perso_connexion + "</div> <div style=\"clear: both;\"></div>\n</div>\n";

    $("#code").val(code_html);
    $("#fiche_html").html(parseBBCode(code_html));
    debugAlert("Fin generateFichePerso");
}

function generateFicheChrono() {
    debugAlert("Début generateFicheChrono");
    // Valeurs par défaut
    var chrono_image = $("#chrono_image").val() != "" ? $("#chrono_image").val() : "https://i.imgur.com/yfVYiaY.png";
    var chrono_nom_prenom = $("#chrono_nom_prenom").val() != "" ? $("#chrono_nom_prenom").val() : "PRÉNOM ET NOM DU PERSONNAGE";
    var chrono_citation = $("#chrono_citation").val() != "" ? $("#chrono_citation").val() : "« Ta petite citation badass ici. »";
    var chrono_titre = $("#chrono_titre").val() != "" ? $("#chrono_titre").val() : "MA CHRONOLOGIE RP";
    var chrono_soustitre = $("#chrono_soustitre").val() != "" ? $("#chrono_soustitre").val() : "du plus ancien au plus récent";

    var code_html = "";
    code_html += "<img src=\"" + chrono_image + "\" /> <div class=\"mep_pres_psfond\"><div class=\"mep_pres_pseudo\">" + chrono_nom_prenom + "</div><div class=\"mep_pres_citation\">" + chrono_citation + "</div></div><div class=\"mep_su_titrebord\"></div> <div class=\"mep_chrono_fond\"> <div class=\"mep_chrono_titre\">" + chrono_titre + "</div> <div class=\"mep_chrono_soustitre\">" + chrono_soustitre + "</div>";

    var linecount = 0;
    $(".woa_bloc_ligne").each(function() {
        linecount++;
        // Valeurs par défaut
        var chrono_titrerp = $(this).find(".chrono_titrerp").val() != "" ? $(this).find(".chrono_titrerp").val() : "Titre du rp";
        var chrono_lienrp = $(this).find(".chrono_lienrp").val() != "" ? $(this).find(".chrono_lienrp").val() : "https://woa-rpg.forumactif.com/";
        var chrono_descrp = $(this).find(".chrono_descrp").val() != "" ? $(this).find(".chrono_descrp").val() : "Description du rp ici.";

        code_html += " <div class=\"mep_chrono_rp\">[url=" + chrono_lienrp + "]" + linecount + "- " + chrono_titrerp + "[/url]</div> <div class=\"mep_su_titrebordgauche\"></div><div class=\"mep_chrono_texte\">" + chrono_descrp + "</div>";
    });
    code_html += " </div><div class=\"mep_ava_modif\">MISE À JOUR LE " + getTodayDate() + "</div>\n";

    $("#code").val(code_html);
    $("#fiche_html").html(parseBBCode(code_html));
    debugAlert("Fin generateFicheChrono");
}

function generateFicheLiens() {
    debugAlert("Début generateFicheLiens");
    // Valeurs par défaut
    var liens_image = $("#liens_image").val() != "" ? $("#liens_image").val() : "https://i.imgur.com/yfVYiaY.png";
    var liens_nom_prenom = $("#liens_nom_prenom").val() != "" ? $("#liens_nom_prenom").val() : "PRÉNOM ET NOM DU PERSONNAGE";
    var liens_citation = $("#liens_citation").val() != "" ? $("#liens_citation").val() : "« Ta petite citation badass ici. »";
    var liens_titre = $("#liens_titre").val() != "" ? $("#liens_titre").val() : "MES LIENS RP";
    var liens_soustitre = $("#liens_soustitre").val() != "" ? $("#liens_soustitre").val() : "du plus amical au plus hostile";

    var code_html = "";
    code_html += "<img src=\"" + liens_image + "\" /> <div class=\"mep_pres_psfond\"><div class=\"mep_pres_pseudo\">" + liens_nom_prenom + "</div><div class=\"mep_pres_citation\">" + liens_citation + "</div></div><div class=\"mep_su_titrebord\"></div> <div class=\"mep_chrono_fond\"> <div class=\"mep_chrono_titre\">" + liens_titre + "</div> <div class=\"mep_chrono_soustitre\">" + liens_soustitre + "</div>";

    var linecount = 0;
    $(".woa_bloc_ligne").each(function() {
        linecount++;
        // Valeurs par défaut
        var liens_titrerp = $(this).find(".liens_titrerp").val() != "" ? $(this).find(".liens_titrerp").val() : "Lien avec personnage";
        var liens_lienrp = $(this).find(".liens_lienrp").val() != "" ? $(this).find(".liens_lienrp").val() : "https://woa-rpg.forumactif.com/";
        var liens_descrp = $(this).find(".liens_descrp").val() != "" ? $(this).find(".liens_descrp").val() : "Description du lien ici.";

        code_html += " <div class=\"mep_chrono_rp\">[url=" + liens_lienrp + "]" + linecount + "- " + liens_titrerp + "[/url]</div> <div class=\"mep_su_titrebordgauche\"></div><div class=\"mep_chrono_texte\">" + liens_descrp + "</div>";
    });
    code_html += " </div><div class=\"mep_ava_modif\">MISE À JOUR LE " + getTodayDate() + "</div>\n";

    $("#code").val(code_html);
    $("#fiche_html").html(parseBBCode(code_html));
    debugAlert("Fin generateFicheLiens");
}

function generateTemplateRp() {
    debugAlert("Début generateTemplateRp");
    var tpl_suffixe = $("#tpl_suffixe").val() != "" ? $("#tpl_suffixe").val() : "perso";
    tpl_suffixe = tpl_suffixe.toLowerCase().replace(/[^a-z]/g, "");

    // Valeurs par défaut

    // CONTENEUR
    var tpl_cont_allmargin = $("#tpl_cont_allmargin").prop('checked');
    var tpl_cont_margintop = $("#tpl_cont_margintop").val() != "" ? $("#tpl_cont_margintop").val() : $("#tpl_cont_margintop").attr("placeholder");
    var tpl_cont_marginbottom = $("#tpl_cont_marginbottom").val() != "" ? $("#tpl_cont_marginbottom").val() : $("#tpl_cont_marginbottom").attr("placeholder");
    var tpl_cont_marginleft = $("#tpl_cont_marginleft").val() != "" ? $("#tpl_cont_marginleft").val() : $("#tpl_cont_marginleft").attr("placeholder");
    var tpl_cont_marginright = $("#tpl_cont_marginright").val() != "" ? $("#tpl_cont_marginright").val() : $("#tpl_cont_marginright").attr("placeholder");
    var tpl_cont_margin = $("#tpl_cont_margin").val() != "" ? $("#tpl_cont_margin").val() : $("#tpl_cont_margin").attr("placeholder");

    var tpl_cont_allbordercolor = $("#tpl_cont_allbordercolor").prop('checked');
    var tpl_cont_bordercolortop = $("#tpl_cont_bordercolortop").val() != "" ? $("#tpl_cont_bordercolortop").val() : $("#tpl_cont_bordercolortop").attr("placeholder");
    var tpl_cont_bordercolorbottom = $("#tpl_cont_bordercolorbottom").val() != "" ? $("#tpl_cont_bordercolorbottom").val() : $("#tpl_cont_bordercolorbottom").attr("placeholder");
    var tpl_cont_bordercolorleft = $("#tpl_cont_bordercolorleft").val() != "" ? $("#tpl_cont_bordercolorleft").val() : $("#tpl_cont_bordercolorleft").attr("placeholder");
    var tpl_cont_bordercolorright = $("#tpl_cont_bordercolorright").val() != "" ? $("#tpl_cont_bordercolorright").val() : $("#tpl_cont_bordercolorright").attr("placeholder");
    var tpl_cont_bordercolor = $("#tpl_cont_bordercolor").val() != "" ? $("#tpl_cont_bordercolor").val() : $("#tpl_cont_bordercolor").attr("placeholder");

    var tpl_cont_allbordersize = $("#tpl_cont_allbordersize").prop('checked');
    var tpl_cont_bordersizetop = $("#tpl_cont_bordersizetop").val() != "" ? $("#tpl_cont_bordersizetop").val() : $("#tpl_cont_bordersizetop").attr("placeholder");
    var tpl_cont_bordersizebottom = $("#tpl_cont_bordersizebottom").val() != "" ? $("#tpl_cont_bordersizebottom").val() : $("#tpl_cont_bordersizebottom").attr("placeholder");
    var tpl_cont_bordersizeleft = $("#tpl_cont_bordersizeleft").val() != "" ? $("#tpl_cont_bordersizeleft").val() : $("#tpl_cont_bordersizeleft").attr("placeholder");
    var tpl_cont_bordersizeright = $("#tpl_cont_bordersizeright").val() != "" ? $("#tpl_cont_bordersizeright").val() : $("#tpl_cont_bordersizeright").attr("placeholder");
    var tpl_cont_bordersize = $("#tpl_cont_bordersize").val() != "" ? $("#tpl_cont_bordersize").val() : $("#tpl_cont_bordersize").attr("placeholder");

    var tpl_cont_allborderradius = $("#tpl_cont_allborderradius").prop('checked');
    var tpl_cont_borderradiustopleft = $("#tpl_cont_borderradiustopleft").val() != "" ? $("#tpl_cont_borderradiustopleft").val() : $("#tpl_cont_borderradiustopleft").attr("placeholder");
    var tpl_cont_borderradiustopright = $("#tpl_cont_borderradiustopright").val() != "" ? $("#tpl_cont_borderradiustopright").val() : $("#tpl_cont_borderradiustopright").attr("placeholder");
    var tpl_cont_borderradiusbottomleft = $("#tpl_cont_borderradiusbottomleft").val() != "" ? $("#tpl_cont_borderradiusbottomleft").val() : $("#tpl_cont_borderradiusbottomleft").attr("placeholder");
    var tpl_cont_borderradiusbottomright = $("#tpl_cont_borderradiusbottomright").val() != "" ? $("#tpl_cont_borderradiusbottomright").val() : $("#tpl_cont_borderradiusbottomright").attr("placeholder");
    var tpl_cont_borderradius = $("#tpl_cont_borderradius").val() != "" ? $("#tpl_cont_borderradius").val() : $("#tpl_cont_borderradius").attr("placeholder");

    var tpl_cont_backgroundcolor = $("#tpl_cont_backgroundcolor").val() != "" ? $("#tpl_cont_backgroundcolor").val() : $("#tpl_cont_backgroundcolor").attr("placeholder");

    // HEADER
    var tpl_header_height = $("#tpl_header_height").val() != "" ? $("#tpl_header_height").val() : $("#tpl_header_height").attr("placeholder");
    var tpl_header_imgalign = $("#tpl_header_imgalign").val();
    var tpl_header_imgurl = $("#tpl_header_imgurl").val() != "" ? $("#tpl_header_imgurl").val() : $("#tpl_header_imgurl").attr("placeholder");
    var tpl_header_bordersize = $("#tpl_header_bordersize").val() != "" ? $("#tpl_header_bordersize").val() : $("#tpl_header_bordersize").attr("placeholder");
    var tpl_header_bordercolor = $("#tpl_header_bordercolor").val() != "" ? $("#tpl_header_bordercolor").val() : $("#tpl_header_bordercolor").attr("placeholder");
    var tpl_header_paddingright = $("#tpl_header_paddingright").val() != "" ? $("#tpl_header_paddingright").val() : $("#tpl_header_paddingright").attr("placeholder");
    var tpl_header_paddingleft = $("#tpl_header_paddingleft").val() != "" ? $("#tpl_header_paddingleft").val() : $("#tpl_header_paddingleft").attr("placeholder");
    var tpl_header_justifycontent = $("#tpl_header_justifycontent").val();
    var tpl_header_alignitems = $("#tpl_header_alignitems").val();
    var tpl_header_lineheight = $("#tpl_header_lineheight").val() != "" ? $("#tpl_header_lineheight").val() : $("#tpl_header_lineheight").attr("placeholder");

    // TITRE
    var tpl_title_typo = $("#tpl_title_typo").val() != "" ? $("#tpl_title_typo").val() : $("#tpl_title_typo").attr("placeholder");
    var tpl_title_color = $("#tpl_title_color").val() != "" ? $("#tpl_title_color").val() : $("#tpl_title_color").attr("placeholder");
    var tpl_title_size = $("#tpl_title_size").val() != "" ? $("#tpl_title_size").val() : $("#tpl_title_size").attr("placeholder");
    var tpl_title_weight = $("#tpl_title_weight").val() != "" ? $("#tpl_title_weight").val() : $("#tpl_title_weight").attr("placeholder");
    var tpl_title_style = $("#tpl_title_style").val() != "" ? $("#tpl_title_style").val() : $("#tpl_title_style").attr("placeholder");
    var tpl_title_align = $("#tpl_title_align").val() != "" ? $("#tpl_title_align").val() : $("#tpl_title_align").attr("placeholder");

    // FEAT
    var tpl_feat_display = $("#tpl_feat_display").prop('checked');
    var tpl_feat_typo = $("#tpl_feat_typo").val() != "" ? $("#tpl_feat_typo").val() : $("#tpl_feat_typo").attr("placeholder");
    var tpl_feat_color = $("#tpl_feat_color").val() != "" ? $("#tpl_feat_color").val() : $("#tpl_feat_color").attr("placeholder");
    var tpl_feat_size = $("#tpl_feat_size").val() != "" ? $("#tpl_feat_size").val() : $("#tpl_feat_size").attr("placeholder");
    var tpl_feat_weight = $("#tpl_feat_weight").val() != "" ? $("#tpl_feat_weight").val() : $("#tpl_feat_weight").attr("placeholder");
    var tpl_feat_style = $("#tpl_feat_style").val() != "" ? $("#tpl_feat_style").val() : $("#tpl_feat_style").attr("placeholder");
    var tpl_feat_align = $("#tpl_feat_align").val() != "" ? $("#tpl_feat_align").val() : $("#tpl_feat_align").attr("placeholder");
    var tpl_feat_bordersize = $("#tpl_feat_bordersize").val() != "" ? $("#tpl_feat_bordersize").val() : $("#tpl_feat_bordersize").attr("placeholder");
    var tpl_feat_bordercolor = $("#tpl_feat_bordercolor").val() != "" ? $("#tpl_feat_bordercolor").val() : $("#tpl_feat_bordercolor").attr("placeholder");

    // TEXTE RP
    var tpl_rp_typo = $("#tpl_rp_typo").val() != "" ? $("#tpl_rp_typo").val() : $("#tpl_rp_typo").attr("placeholder");
    var tpl_rp_color = $("#tpl_rp_color").val() != "" ? $("#tpl_rp_color").val() : $("#tpl_rp_color").attr("placeholder");
    var tpl_rp_size = $("#tpl_rp_size").val() != "" ? $("#tpl_rp_size").val() : $("#tpl_rp_size").attr("placeholder");
    var tpl_rp_align = $("#tpl_rp_align").val() != "" ? $("#tpl_rp_align").val() : $("#tpl_rp_align").attr("placeholder");
    var tpl_rp_padding = $("#tpl_rp_padding").val() != "" ? $("#tpl_rp_padding").val() : $("#tpl_rp_padding").attr("placeholder");

    // FOOTER
    var tpl_footer_display = $("#tpl_footer_display").prop('checked');
    var tpl_footer_height = $("#tpl_footer_height").val() != "" ? $("#tpl_footer_height").val() : $("#tpl_footer_height").attr("placeholder");
    var tpl_footer_imgalign = $("#tpl_footer_imgalign").val();
    var tpl_footer_imgurl = $("#tpl_footer_imgurl").val() != "" ? $("#tpl_footer_imgurl").val() : $("#tpl_footer_imgurl").attr("placeholder");
    var tpl_footer_bordersize = $("#tpl_footer_bordersize").val() != "" ? $("#tpl_footer_bordersize").val() : $("#tpl_footer_bordersize").attr("placeholder");
    var tpl_footer_bordercolor = $("#tpl_footer_bordercolor").val() != "" ? $("#tpl_footer_bordercolor").val() : $("#tpl_footer_bordercolor").attr("placeholder");

    // LOREM IPSUM
    var lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam blandit lorem justo, sed aliquam orci euismod nec. Curabitur porta ipsum ac tortor eleifend dignissim. Duis id tempor ante. Maecenas id tristique sem. Curabitur sit amet magna non sapien consectetur pharetra. Integer dui diam, tempor vitae bibendum fringilla, efficitur at justo. Suspendisse vulputate nunc in nisi consectetur ullamcorper. Aenean ligula sapien, maximus varius mattis quis, fringilla sed erat. Ut tristique leo tortor, et bibendum ligula ultricies molestie. Sed vulputate fermentum ex laoreet hendrerit. Suspendisse semper dolor vitae dolor rhoncus dignissim. Vivamus efficitur mi sed nisl suscipit malesuada.\n\nAliquam tincidunt libero eget ex auctor laoreet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi condimentum libero vel pharetra convallis. Nullam commodo maximus lectus eget egestas. Integer imperdiet maximus mauris pulvinar semper. Morbi faucibus consectetur aliquam. Phasellus blandit odio in sem condimentum, sed viverra lectus convallis. Nullam porta finibus aliquam. Integer iaculis fermentum nibh, quis sodales lacus sodales in. Morbi gravida porta fermentum. Proin eget aliquam velit. Proin dapibus eget ipsum et facilisis. Sed eu ipsum laoreet, commodo diam non, maximus mi. Vivamus at nisi laoreet, efficitur tellus vel, sollicitudin est.\n\nQuisque purus diam, dapibus a ipsum in, maximus lobortis sapien. Donec mattis purus id nisl ultricies molestie. Praesent et tincidunt ipsum. Donec sodales diam vel magna sollicitudin, id porttitor erat tempus. Suspendisse felis lectus, euismod sit amet tortor at, varius fermentum nunc. Quisque sit amet sapien id libero bibendum molestie. Aenean vulputate nunc nisl, sed laoreet elit mattis sed. Nam luctus mollis euismod. Nam pretium, sapien in bibendum luctus, lorem sapien ultricies tortor, aliquet fermentum enim justo vel diam. Proin tempus neque augue, sit amet convallis arcu vestibulum id. Quisque faucibus libero lectus, et fermentum dolor ullamcorper id. Sed eu euismod massa. Mauris at commodo justo. Nunc consequat sapien eu mollis tempor. Maecenas ut interdum quam, quis maximus nisl. Cras dignissim ex vitae tortor dictum luctus.\n\nUt sagittis, velit molestie varius accumsan, lectus risus aliquam lectus, eu vulputate diam dolor et nibh. Nunc sit amet nisl mi. Duis id tincidunt dui. Aliquam a porttitor ipsum, sed cursus orci. Cras nunc neque, pretium eu nibh a, tincidunt facilisis quam. Aliquam eu sem a mi imperdiet volutpat. Integer velit velit, sagittis sed interdum at, sollicitudin id neque. Duis molestie, ipsum sed sagittis commodo, nunc sapien gravida elit, nec pharetra est mi sed massa. Mauris euismod tincidunt nunc, quis dictum eros fermentum vel.\n\nVestibulum finibus erat nec aliquam dapibus. Morbi malesuada lobortis tortor, venenatis laoreet urna blandit eu. Proin hendrerit blandit lectus, sed fringilla lacus consectetur ut. Nullam velit quam, dictum et purus non, faucibus feugiat enim. Maecenas id gravida velit. Proin fermentum sodales metus, vitae consectetur lorem. Aliquam nisi tellus, convallis non ante eu, auctor varius dui. Nullam ac magna augue.";

    var code_html = "<div class=\"" + tpl_suffixe + "_rp_main\"><!-- DEBUT HEADER --><div class=\"" + tpl_suffixe + "_rp_header\"><!-- DEBUT TITRE --><div class=\"" + tpl_suffixe + "_rp_titre\">Nom du titre<!-- FIN TITRE -->"
    if(tpl_feat_display)
    {
        code_html += "<!-- DEBUT FEAT --><br><div class=\"" + tpl_suffixe + "_rp_feat\">Feat. Nom du perso</div><!-- FIN FEAT -->";
    }
    code_html += "</div><!-- FIN TITRE --></div><!-- FIN HEADER --><!-- DEBUT TEXTE --><div class=\"" + tpl_suffixe + "_rp_text\">" + lipsum + "</div><!-- FIN TEXTE -->";
    if(tpl_footer_display)
    {
        code_html += "\n<!-- DEBUT FOOTER --><div class=\"" + tpl_suffixe + "_rp_footer\"></div><!-- FIN FOOTER -->";
    }
    code_html += "</div>";

    var mainbordertopcolor = "--" + tpl_suffixe + "_main-border-color";
    var mainborderbottomcolor = "--" + tpl_suffixe + "_main-border-color";
    var mainborderleftcolor = "--" + tpl_suffixe + "_main-border-color";
    var mainborderrightcolor = "--" + tpl_suffixe + "_main-border-color";
    var mainbordertopsize = "--" + tpl_suffixe + "_main-border-size";
    var mainborderbottomsize = "--" + tpl_suffixe + "_main-border-size";
    var mainborderleftsize = "--" + tpl_suffixe + "_main-border-size";
    var mainborderrightsize = "--" + tpl_suffixe + "_main-border-size";
    var mainbordertopleftradius = "--" + tpl_suffixe + "_main-border-radius";
    var mainbordertoprightradius = "--" + tpl_suffixe + "_main-border-radius";
    var mainborderbottomleftradius = "--" + tpl_suffixe + "_main-border-radius";
    var mainborderbottomrightradius = "--" + tpl_suffixe + "_main-border-radius";
    if(!tpl_cont_allbordercolor)
    {
        mainbordertopcolor = "--" + tpl_suffixe + "_main-border-top-color";
        mainborderbottomcolor = "--" + tpl_suffixe + "_main-border-bottom-color";
        mainborderleftcolor = "--" + tpl_suffixe + "_main-border-left-color";
        mainborderrightcolor = "--" + tpl_suffixe + "_main-border-right-color";
    }
    if(!tpl_cont_allbordersize)
    {
        mainbordertopsize = "--" + tpl_suffixe + "_main-border-top-size";
        mainborderbottomsize = "--" + tpl_suffixe + "_main-border-bottom-size";
        mainborderleftsize = "--" + tpl_suffixe + "_main-border-left-size";
        mainborderrightsize = "--" + tpl_suffixe + "_main-border-right-size";
    }
    if(!tpl_cont_allborderradius)
    {
        mainbordertopleftradius = "--" + tpl_suffixe + "_main-border-topleft-radius";
        mainbordertoprightradius = "--" + tpl_suffixe + "_main-border-topright-radius";
        mainborderbottomleftradius = "--" + tpl_suffixe + "_main-border-bottomleft-radius";
        mainborderbottomrightradius = "--" + tpl_suffixe + "_main-border-bottomright-radius";
    }
    
    var code_style = "<style>:root { /* CONTENEUR */";
    // CONTENEUR
    // margin
    if(!tpl_cont_allmargin)
    {
        code_style += " --" + tpl_suffixe + "_main-margin-top: " + tpl_cont_margintop + "px;";
        code_style += " --" + tpl_suffixe + "_main-margin-bottom: " + tpl_cont_marginbottom + "px;";
        code_style += " --" + tpl_suffixe + "_main-margin-left: " + tpl_cont_marginleft + "px;";
        code_style += " --" + tpl_suffixe + "_main-margin-right: " + tpl_cont_marginright + "px;";
    }
    else
    {
        code_style += " --" + tpl_suffixe + "_main-margin: " + tpl_cont_margin + "px;";
    }
    // border color
    if(!tpl_cont_allbordercolor)
    {
        code_style += " --" + tpl_suffixe + "_main-border-top-color: " + tpl_cont_bordercolortop + ";";
        code_style += " --" + tpl_suffixe + "_main-border-bottom-color: " + tpl_cont_bordercolorbottom + ";";
        code_style += " --" + tpl_suffixe + "_main-border-left-color: " + tpl_cont_bordercolorleft + ";";
        code_style += " --" + tpl_suffixe + "_main-border-right-color: " + tpl_cont_bordercolorright + ";";
    }
    else
    {
        code_style += " --" + tpl_suffixe + "_main-border-color: " + tpl_cont_bordercolor + ";";
    }
    // border size
    if(!tpl_cont_allbordersize)
    {
        code_style += " --" + tpl_suffixe + "_main-border-top-size: " + tpl_cont_bordersizetop + "px;";
        code_style += " --" + tpl_suffixe + "_main-border-bottom-size: " + tpl_cont_bordersizebottom + "px;";
        code_style += " --" + tpl_suffixe + "_main-border-left-size: " + tpl_cont_bordersizeleft + "px;";
        code_style += " --" + tpl_suffixe + "_main-border-right-size: " + tpl_cont_bordersizeright + "px;";
    }
    else
    {
        code_style += " --" + tpl_suffixe + "_main-border-size: " + tpl_cont_bordersize + "px;";
    }
    // border radius
    if(!tpl_cont_allborderradius)
    {
        code_style += " --" + tpl_suffixe + "_main-border-topleft-radius: " + tpl_cont_borderradiustopleft + "px;";
        code_style += " --" + tpl_suffixe + "_main-border-topright-radius: " + tpl_cont_borderradiustopright + "px;";
        code_style += " --" + tpl_suffixe + "_main-border-bottomleft-radius: " + tpl_cont_borderradiusbottomleft + "px;";
        code_style += " --" + tpl_suffixe + "_main-border-bottomright-radius: " + tpl_cont_borderradiusbottomright + "px;";
    }
    else
    {
        code_style += " --" + tpl_suffixe + "_main-border-radius: " + tpl_cont_borderradius + "px;";
    }
    code_style += " --" + tpl_suffixe + "_main-background-color: " + tpl_cont_backgroundcolor + ";";

    // HEADER
    code_style += " /* HEADER */";
    code_style += " --" + tpl_suffixe + "_header-height: " + tpl_header_height + "px;";
    code_style += " --" + tpl_suffixe + "_header-img-align : " + tpl_header_imgalign + ";";
    code_style += " --" + tpl_suffixe + "_header-img-url: url(\"" + tpl_header_imgurl + "\");";
    code_style += " --" + tpl_suffixe + "_header-border-size: " + tpl_header_bordersize + "px;";
    code_style += " --" + tpl_suffixe + "_header-border-color: " + tpl_header_bordercolor + ";";
    code_style += " --" + tpl_suffixe + "_header-padding-right: " + tpl_header_paddingright + "px;";
    code_style += " --" + tpl_suffixe + "_header-padding-left: " + tpl_header_paddingleft + "px;";
    code_style += " --" + tpl_suffixe + "_header-justify-content: " + tpl_header_justifycontent + ";";
    code_style += " --" + tpl_suffixe + "_header-align-items: " + tpl_header_alignitems + ";";
    code_style += " --" + tpl_suffixe + "_header-line-height: " + tpl_header_lineheight + "px;";

    // TITRE
    code_style += " /* TITRE */";
    code_style += " --" + tpl_suffixe + "_title-typo: " + tpl_title_typo + ";";
    code_style += " --" + tpl_suffixe + "_title-color: " + tpl_title_color + ";";
    code_style += " --" + tpl_suffixe + "_title-size: " + tpl_title_size + "px;";
    code_style += " --" + tpl_suffixe + "_title-weight: " + tpl_title_weight + ";";
    code_style += " --" + tpl_suffixe + "_title-style: " + tpl_title_style + ";";
    code_style += " --" + tpl_suffixe + "_title-align: " + tpl_title_align + ";";

    // FEAT
    if(tpl_feat_display)
    {
        code_style += " /* FEAT */";
        code_style += " --" + tpl_suffixe + "_feat-typo: " + tpl_feat_typo + ";";
        code_style += " --" + tpl_suffixe + "_feat-color: " + tpl_feat_color + ";";
        code_style += " --" + tpl_suffixe + "_feat-size: " + tpl_feat_size + "px;";
        code_style += " --" + tpl_suffixe + "_feat-weight: " + tpl_feat_weight + ";";
        code_style += " --" + tpl_suffixe + "_feat-style: " + tpl_feat_style + ";";
        code_style += " --" + tpl_suffixe + "_feat-align: " + tpl_feat_align + ";";
        code_style += " --" + tpl_suffixe + "_feat-border-size: " + tpl_feat_bordersize + "px;";
        code_style += " --" + tpl_suffixe + "_feat-border-color: " + tpl_feat_bordercolor + ";";
    }

    //TEXTE RP
    code_style += " /* TEXTE RP */";
    code_style += "--" + tpl_suffixe + "_rp-text-typo: " + tpl_rp_typo + ";";
    code_style += "--" + tpl_suffixe + "_rp-text-color: " + tpl_rp_color + ";";
    code_style += "--" + tpl_suffixe + "_rp-text-size: " + tpl_rp_size + "px;";
    code_style += "--" + tpl_suffixe + "_rp-text-align: " + tpl_rp_align + ";";
    code_style += "--" + tpl_suffixe + "_rp-text-padding: " + tpl_rp_padding + "px;";

    // FOOTER
    if(tpl_footer_display)
    {
        code_style += " /* FOOTER */";
        code_style += "--" + tpl_suffixe + "_footer-height: " + tpl_footer_height + "px;";
        code_style += "--" + tpl_suffixe + "_footer-img-align : " + tpl_footer_imgalign + ";";
        code_style += "--" + tpl_suffixe + "_footer-img-url: url(\"" + tpl_footer_imgurl + "\");";
        code_style += "--" + tpl_suffixe + "_footer-border-size: " + tpl_footer_bordersize + "px;";
        code_style += "--" + tpl_suffixe + "_footer-border-color: " + tpl_footer_bordercolor + ";";
    }

    code_style += " } ." + tpl_suffixe + "_rp_main { margin: auto; height: auto; overflow: hidden;";
    if(!tpl_cont_allmargin)
    {
        code_style += " margin-top: var(--" + tpl_suffixe + "_main-margin-top); margin-bottom: var(--" + tpl_suffixe + "_main-margin-bottom); margin-left: var(--" + tpl_suffixe + "_main-margin-left); margin-right: var(--" + tpl_suffixe + "_main-margin-right)";
    }
    else
    {
        code_style += " margin: var(--" + tpl_suffixe + "_main-margin);";
    }


    code_style += " border-top: var(" + mainbordertopsize + ") solid var(" + mainbordertopcolor + "); border-bottom: var(" + mainborderbottomsize + ") solid var(" + mainborderbottomcolor + "); border-left: var(" + mainborderleftsize + ") solid var(" + mainborderleftcolor + "); border-right: var(" + mainborderrightsize + ") solid var(" + mainborderrightcolor + "); border-top-left-radius: var(" + mainbordertopleftradius + "); border-top-right-radius: var(" + mainbordertoprightradius + "); border-bottom-left-radius: var(" + mainborderbottomleftradius + "); border-bottom-right-radius: var(" + mainborderbottomrightradius + "); background-color: var(--" + tpl_suffixe + "_main-background-color); } ." + tpl_suffixe + "_rp_header { display: flex; height: var(--" + tpl_suffixe + "_header-height); background: var(--" + tpl_suffixe + "_header-img-url) no-repeat var(--" + tpl_suffixe + "_header-img-align); font-size: var(--" + tpl_suffixe + "_title-size); color: var(--" + tpl_suffixe + "_title-color); font-family: var(--" + tpl_suffixe + "_title-typo); font-weight: var(--" + tpl_suffixe + "_title-weight); font-style: var(--" + tpl_suffixe + "_title-style); padding-right: var(--" + tpl_suffixe + "_header-padding-right); padding-left: var(--" + tpl_suffixe + "_header-padding-left); justify-content: var(--" + tpl_suffixe + "_header-justify-content); align-items: var(--" + tpl_suffixe + "_header-align-items); line-height: var(--" + tpl_suffixe + "_header-line-height); text-align: var(--" + tpl_suffixe + "_title-align); border-bottom: var(--" + tpl_suffixe + "_header-border-size) solid var(--" + tpl_suffixe + "_header-border-color); }";

    if(tpl_feat_display)
    {
        code_style += " ." + tpl_suffixe + "_rp_feat { border-top: var(--" + tpl_suffixe + "_feat-border-size) solid var(--" + tpl_suffixe + "_feat-border-color); color: var(--" + tpl_suffixe + "_feat-color); font-size: var(--" + tpl_suffixe + "_feat-size); font-family: var(--" + tpl_suffixe + "_feat-typo); font-weight: var(--" + tpl_suffixe + "_feat-weight); font-style: var(--" + tpl_suffixe + "_feat-style); text-align: var(--" + tpl_suffixe + "_feat-align); }";
    

    }
        
    code_style += " ." + tpl_suffixe + "_rp_text { font-family: var(--" + tpl_suffixe + "_rp-text-typo); font-size: var(--" + tpl_suffixe + "_rp-text-size); text-align: var(--" + tpl_suffixe + "_rp-text-align); color: var(--" + tpl_suffixe + "_rp-text-color); padding: var(--" + tpl_suffixe + "_rp-text-padding); }";
    
    if(tpl_footer_display)
    {
        code_style += " ." + tpl_suffixe + "_rp_footer { height: var(--" + tpl_suffixe + "_footer-height); background: var(--" + tpl_suffixe + "_footer-img-url) no-repeat var(--" + tpl_suffixe + "_footer-img-align); border-top: var(--" + tpl_suffixe + "_footer-border-size) solid var(--" + tpl_suffixe + "_footer-border-color); }";
    }

    code_style += "</style>";

    code_html = code_html + code_style;

    $("#code").val(code_html);
    $("#fiche_html").html(parseBBCode(code_html));
    debugAlert("Fin generateTemplateRp");
}


function addLigne(id) {
    debugAlert("Début addLigne(" + id + ")");
    var code_html = "";
    switch(id) {
        case "add_chrono_line":
            code_html += "<div class=\"woa_bloc_ligne\">\n";
            code_html += "<div class=\"woa_blocs_lignes_header\">\n";
            code_html += "<div class=\"mep_pres_bloctitre\">SUJET RP</div>\n";
            code_html += "<div class=\"del_chrono_line woa_button\">x</div>\n";
            code_html += "</div>\n";
            code_html += "<div class=\"woa_ligne\">\n";
            code_html += "<div class=\"woa_libelle\"><span class=\"mep_po\">TITRE DU RP :</span></div>\n";
            code_html += "<div class=\"woa_champ\"><input type=\"text\" class=\"chrono_titrerp\" placeholder=\"Titre du rp\" /></div>\n";
            code_html += "</div>\n";
            code_html += "<div class=\"woa_ligne\">\n";
            code_html += "<div class=\"woa_libelle\"><span class=\"mep_po\">LIEN DU RP :</span></div>\n";
            code_html += "<div class=\"woa_champ\"><input type=\"text\" class=\"chrono_lienrp\" placeholder=\"https://woa-rpg.forumactif.com/\" /></div>\n";
            code_html += "</div>\n";
            code_html += "<textarea class=\"woa_champ_ta chrono_descrp\">Description du rp ici.</textarea>\n";
            code_html += "</div>\n";
        
            $(".woa_chrono_blocs").append(code_html);
        
            $(".del_chrono_line").bind("click", function() {
                delLigneChrono($(this));
            });
        
            if ($(".del_chrono_line").length > 1)
                $(".del_chrono_line").show();
            else
                $(".del_chrono_line").hide();
            break;
        case "add_liens_line":
            code_html += "<div class=\"woa_bloc_ligne\">\n";
            code_html += "<div class=\"woa_blocs_lignes_header\">\n";
            code_html += "<div class=\"mep_pres_bloctitre\">LIEN RP</div>\n";
            code_html += "<div class=\"del_liens_line woa_button\">x</div>\n";
            code_html += "</div>\n";
            code_html += "<div class=\"woa_ligne\">\n";
            code_html += "<div class=\"woa_libelle\"><span class=\"mep_po\">NOM DU PERSONNAGE :</span></div>\n";
            code_html += "<div class=\"woa_champ\"><input type=\"text\" class=\"liens_titrerp\" placeholder=\"Lien avec personnage\" /></div>\n";
            code_html += "</div>\n";
            code_html += "<div class=\"woa_ligne\">\n";
            code_html += "<div class=\"woa_libelle\"><span class=\"mep_po\">LIEN DU PERSONNAGE :</span></div>\n";
            code_html += "<div class=\"woa_champ\"><input type=\"text\" class=\"liens_lienrp\" placeholder=\"https://woa-rpg.forumactif.com/\" /></div>\n";
            code_html += "</div>\n";
            code_html += "<textarea class=\"woa_champ_ta liens_descrp\">Description du lien ici.</textarea>\n";
            code_html += "</div>\n";
        
            $(".woa_liens_blocs").append(code_html);
        
            $(".del_liens_line").bind("click", function() {
                delLigneLiens($(this));
            });
        
            if ($(".del_liens_line").length > 1)
                $(".del_liens_line").show();
            else
                $(".del_liens_line").hide();
            break;
    }
    debugAlert("Fin addLigne(" + id + ")");
}

function delLigneChrono(selector) {
    debugAlert("Début delLigneChrono(" + selector + ")");
    if ($(".woa_bloc_ligne").length > 1)
        selector.parents(".woa_bloc_ligne").remove();

    if ($(".del_chrono_line").length > 1)
        $(".del_chrono_line").show();
    else
        $(".del_chrono_line").hide();
    debugAlert("Fin delLigneChrono(" + selector + ")");
}

function delLigneLiens(selector) {
    debugAlert("Début delLigneLiens(" + selector + ")");
    if ($(".woa_bloc_ligne").length > 1)
        selector.parents(".woa_bloc_ligne").remove();

    if ($(".del_liens_line").length > 1)
        $(".del_liens_line").show();
    else
        $(".del_liens_line").hide();
    debugAlert("Fin delLigneLiens(" + selector + ")");
}